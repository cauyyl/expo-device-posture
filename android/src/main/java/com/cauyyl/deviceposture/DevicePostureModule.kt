package com.cauyyl.deviceposture

import android.app.Activity
import androidx.core.content.ContextCompat
import androidx.core.util.Consumer
import androidx.window.layout.FoldingFeature
import androidx.window.layout.WindowInfoTracker
import androidx.window.layout.WindowLayoutInfo
import androidx.window.java.layout.WindowInfoTrackerCallbackAdapter
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.util.concurrent.Executor

class DevicePostureModule : Module() {
  private val foldStateDictionary = mapOf(
    FoldingFeature.State.FLAT to "flat",
    FoldingFeature.State.HALF_OPENED to "halfOpened"
  )

  private var windowInfoTrackerAdapter: WindowInfoTrackerCallbackAdapter? = null
  private var windowLayoutInfoListener: Consumer<WindowLayoutInfo>? = null
  private var lastEmittedPosture: String? = null
  private var isObserving = false

  override fun definition() = ModuleDefinition {
    Name("DevicePosture")

    Events("onDevicePostureChange")

    OnStartObserving {
      isObserving = true
      emitInitialPosture()
      startListeningForPostureChanges()
    }

    OnStopObserving {
      isObserving = false
      stopListeningForPostureChanges()
    }

    OnActivityEntersForeground {
      if (isObserving) {
        startListeningForPostureChanges()
      }
    }

    OnActivityEntersBackground {
      stopListeningForPostureChanges()
    }

    Function("hello") {
      "Hello world! 👋"
    }
  }

  private fun startListeningForPostureChanges(activityCandidate: Activity? = appContext.currentActivity as? Activity) {
    if (windowLayoutInfoListener != null) {
      return
    }

    val activity = activityCandidate ?: return
    val adapter = WindowInfoTrackerCallbackAdapter(WindowInfoTracker.getOrCreate(activity))
    windowInfoTrackerAdapter = adapter

    val executor: Executor = ContextCompat.getMainExecutor(activity)
    windowLayoutInfoListener = Consumer { layoutInfo ->
      val posture = mapFoldState(layoutInfo)
      if (posture != lastEmittedPosture) {
        lastEmittedPosture = posture
        sendEvent("onDevicePostureChange", mapOf("posture" to posture))
      }
    }

    adapter.addWindowLayoutInfoListener(activity, executor, windowLayoutInfoListener!!)
  }

  private fun stopListeningForPostureChanges() {
    val listener = windowLayoutInfoListener ?: return
    windowInfoTrackerAdapter?.removeWindowLayoutInfoListener(listener)
    windowLayoutInfoListener = null
    windowInfoTrackerAdapter = null
  }

  private fun mapFoldState(layoutInfo: WindowLayoutInfo): String {
    val foldingFeature = layoutInfo.displayFeatures.filterIsInstance<FoldingFeature>().firstOrNull()
    return foldingFeature?.state?.let { foldStateDictionary[it] } ?: "unknown"
  }

  private fun emitInitialPosture() {
    val initialPosture = lastEmittedPosture ?: "unknown"
    lastEmittedPosture = initialPosture
    sendEvent("onDevicePostureChange", mapOf("posture" to initialPosture))
  }
}
