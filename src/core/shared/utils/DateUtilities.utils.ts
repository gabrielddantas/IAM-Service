export class DateUtilities {
  public static getCurrentBrazilianTimestamp(): string {
    const date = new Date();
    date.setHours(date.getHours() - 3);
    return date.toISOString();
  }
}
