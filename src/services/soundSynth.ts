/**
 * Web Audio API Analog Tube & Heavy Doom Drone Synthesizer
 * Provides authentic, royalty-free analog soundscapes with tube saturation,
 * low-frequency doom drone oscillation, and vinyl surface texture.
 */

class SoundSynth {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private distortion: WaveShaperNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private noiseGain: GainNode | null = null;
  private isPlaying: boolean = false;
  private currentFreq: number = 65.41;
  private currentVolume: number = 0.35;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private makeDistortionCurve(amount: number): Float32Array<ArrayBuffer> {
    const k = amount;
    const nSamples = 44100;
    const buffer = new ArrayBuffer(nSamples * 4);
    const curve = new Float32Array(buffer);
    const deg = Math.PI / 180;
    for (let i = 0; i < nSamples; ++i) {
      const x = (i * 2) / nSamples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  private createVinylCrackBuffer(): AudioBuffer | null {
    if (!this.ctx) return null;
    const bufferSize = this.ctx.sampleRate * 3; // 3 seconds loop
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      // Soft vinyl crackle & dust noise
      const r = Math.random();
      if (r > 0.9995) {
        data[i] = (Math.random() * 2 - 1) * 0.4;
      } else if (r > 0.995) {
        data[i] = (Math.random() * 2 - 1) * 0.15;
      } else {
        data[i] = (Math.random() * 2 - 1) * 0.015;
      }
    }
    return buffer;
  }

  public play(freq: number = 65.41, distortionAmount: number = 20) {
    this.initContext();
    if (!this.ctx) return;

    this.stop();
    this.currentFreq = freq;

    const now = this.ctx.currentTime;

    // Master Gain with soft ramp
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.001, now);
    this.masterGain.gain.exponentialRampToValueAtTime(this.currentVolume, now + 0.5);
    this.masterGain.connect(this.ctx.destination);

    // Filter - Warm tube roll-off
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(320, now);
    this.filter.Q.setValueAtTime(3.5, now);

    // Distortion - Tube overdrive
    this.distortion = this.ctx.createWaveShaper();
    this.distortion.curve = this.makeDistortionCurve(distortionAmount);
    this.distortion.oversample = '4x';

    // Sub-bass Saw oscillator (Heavy drop tone)
    this.osc1 = this.ctx.createOscillator();
    this.osc1.type = 'sawtooth';
    this.osc1.frequency.setValueAtTime(freq, now);

    // Octave 5th harmony for doom chord (freq * 1.5)
    this.osc2 = this.ctx.createOscillator();
    this.osc2.type = 'triangle';
    this.osc2.frequency.setValueAtTime(freq * 1.498, now);

    const oscMix = this.ctx.createGain();
    oscMix.gain.setValueAtTime(0.4, now);

    this.osc1.connect(this.distortion);
    this.osc2.connect(this.distortion);
    this.distortion.connect(this.filter);
    this.filter.connect(oscMix);
    oscMix.connect(this.masterGain);

    this.osc1.start(now);
    this.osc2.start(now);

    // Vinyl crackle loop
    const crackleBuffer = this.createVinylCrackBuffer();
    if (crackleBuffer) {
      this.noiseNode = this.ctx.createBufferSource();
      this.noiseNode.buffer = crackleBuffer;
      this.noiseNode.loop = true;

      this.noiseGain = this.ctx.createGain();
      this.noiseGain.gain.setValueAtTime(0.08, now);

      this.noiseNode.connect(this.noiseGain);
      this.noiseGain.connect(this.masterGain);
      this.noiseNode.start(now);
    }

    this.isPlaying = true;
  }

  public stop() {
    if (!this.ctx || !this.isPlaying) return;

    const now = this.ctx.currentTime;
    if (this.masterGain) {
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
    }

    setTimeout(() => {
      try {
        this.osc1?.stop();
        this.osc1?.disconnect();
        this.osc2?.stop();
        this.osc2?.disconnect();
        this.noiseNode?.stop();
        this.noiseNode?.disconnect();
      } catch {
        // Ignore already stopped
      }
      this.osc1 = null;
      this.osc2 = null;
      this.noiseNode = null;
      this.isPlaying = false;
    }, 320);
  }

  public setVolume(vol: number) {
    this.currentVolume = Math.max(0, Math.min(1, vol));
    if (this.ctx && this.masterGain && this.isPlaying) {
      this.masterGain.gain.setValueAtTime(this.currentVolume, this.ctx.currentTime);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const soundSynth = new SoundSynth();
