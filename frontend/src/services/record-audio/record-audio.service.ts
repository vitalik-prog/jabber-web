import { notification as notificationService } from '../services';
import { RecordStatus } from 'common/enums/enums';

type Constructor = {
  notificationService: typeof notificationService;
};

class RecordAudio {
  #notificationService;
  #recorder?: MediaRecorder;
  #audioChunks: Blob[] = [];
  #audioDataUrl = '';

  constructor({ notificationService }: Constructor) {
    this.#notificationService = notificationService;
  }

  private onSuccess(stream: MediaStream): void {
    this.#recorder = new MediaRecorder(stream);

    this.#recorder.ondataavailable = ({ data }: BlobEvent): void => {
      this.#audioChunks.push(data);
    };
  }

  private onError(err: MediaStreamError): void {
    this.#notificationService.error('Error', <string>err.message);
  }

  public start(): void {
    this.#recorder?.start();
  }

  public pause(): void {
    this.#recorder?.pause();
  }

  public resume(): void {
    this.#recorder?.resume();
  }

  public stop(): string {
    if (this.#recorder?.state !== RecordStatus.INACTIVE) {
      this.#recorder?.stop();
      const audioBlob = new Blob(this.#audioChunks, { type: 'audio/wave' });
      this.#audioDataUrl = URL.createObjectURL(audioBlob);
      this.#audioChunks = [];
    }
    return this.#audioDataUrl;
  }

  public init(): void {
    navigator.getUserMedia(
      { audio: true },
      (stream) => this.onSuccess(stream),
      (err) => this.onError(err));
  }
}

export { RecordAudio };
