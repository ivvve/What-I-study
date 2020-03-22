export namespace StringUtils {
  export function isBlank(value: string): boolean {
    if (!value) {
      return true;
    }

    return value.split(" ").length !== 1;
  }

  export function isNotBlank(value: string): boolean {
    return !isBlank(value);
  }
}
