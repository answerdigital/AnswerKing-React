export class DateFormatter extends Date {
  getFormattedDate(): string {
    return `${this.toString().slice(8, 10)}/${this.toString().slice(5, 7)}/${this.toString().slice(0, 4)}`;
  }
}
