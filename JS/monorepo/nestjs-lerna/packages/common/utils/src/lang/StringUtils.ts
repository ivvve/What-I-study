export namespace StringUtils {
  export function isEmpty(value: string): boolean {
    if (!value) {
      return true;
    }

    return value === '';
  }

  export function isNotEmpty(value: string): boolean {
    return !this.isEmpty(value);
  }

  export function isBlank(value: string): boolean {
    return this.isEmpty(value) && !this.hasWhiteSpace(value);
  }

  export function isNotBlank(value: string): boolean {
    return !this.isBlank(value);
  }

  function hasWhiteSpace(value: string): boolean {
    if (value.length === 0) {
      return false;
    }

    return value.split(' ').length !== 0;
  }
}
