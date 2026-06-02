"use client";

import { Howl } from "howler";

class AudioEngine {
  private ambient: Howl | null = null;
  private orchestral: Howl | null = null;
  private currentTrack: "ambient" | "orchestral" | null = null;
  private initialized = false;

  constructor() {
    if (typeof window !== "undefined") {
      this.init();
    }
  }

  private init() {
    if (this.initialized) return;

    // Standard royal-sounding ambient strings/pad loop
    this.ambient = new Howl({
      src: ["https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"],
      loop: true,
      volume: 0,
    });

    // Elegant orchestral piano/flute track for high engagement zones
    this.orchestral = new Howl({
      src: ["https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3"],
      loop: true,
      volume: 0,
    });

    this.initialized = true;
  }

  public playAmbient() {
    if (!this.ambient) return;
    this.ambient.play();
    this.ambient.fade(0, 0.4, 3000);
    this.currentTrack = "ambient";
  }

  public fadeToOrchestral() {
    if (!this.ambient || !this.orchestral || this.currentTrack === "orchestral") return;

    this.ambient.fade(this.ambient.volume(), 0.05, 2000);
    if (!this.orchestral.playing()) {
      this.orchestral.play();
    }
    this.orchestral.fade(this.orchestral.volume(), 0.5, 2000);
    this.currentTrack = "orchestral";
  }

  public fadeToAmbient() {
    if (!this.ambient || !this.orchestral || this.currentTrack === "ambient") return;

    this.orchestral.fade(this.orchestral.volume(), 0, 2000);
    this.ambient.fade(this.ambient.volume(), 0.4, 2000);
    this.currentTrack = "ambient";
  }

  public adjustVolumeByScroll(progress: number) {
    // Dynamically adjust audio mix based on scroll progression
    // In the first 40% scroll, play ambient. 40% - 80%, swell orchestral. > 80%, blend both softly.
    if (!this.ambient || !this.orchestral) return;

    if (progress < 0.3) {
      this.fadeToAmbient();
    } else if (progress >= 0.3 && progress < 0.7) {
      this.fadeToOrchestral();
    } else {
      // Climax blend
      this.ambient.fade(this.ambient.volume(), 0.25, 1000);
      this.orchestral.fade(this.orchestral.volume(), 0.35, 1000);
    }
  }

  public mute(isMuted: boolean) {
    if (this.ambient) this.ambient.mute(isMuted);
    if (this.orchestral) this.orchestral.mute(isMuted);
  }

  public stopAll() {
    if (this.ambient) this.ambient.stop();
    if (this.orchestral) this.orchestral.stop();
  }
}

export const audioEngine = typeof window !== "undefined" ? new AudioEngine() : null;
