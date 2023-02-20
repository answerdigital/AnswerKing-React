export default function FormatDate(date: Date): string {
  return new Date(date).toLocaleDateString('en-GB');
}
