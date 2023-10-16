export abstract class BasePage {
  public async execute(): Promise<void> {
    await this.start();
  }

  public async verify(): Promise<void> {
    await this.verification();
  }

  protected abstract start(): Promise<void>;

  protected abstract verification(): Promise<void>;
}
