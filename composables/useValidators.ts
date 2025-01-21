// composables/useValidators.ts
export function useValidators() {
  function alphaSpacesValidator(
    value: string | null | undefined,
    t: (key: string, params?: Record<string, any>) => string,
    minLength: number = 3,
    maxLength: number = 255
  ): Promise<void> {
    // Boş dəyəri yoxla (boş dəyər üçün xəta qaytarma)
    if (!value) {
      return Promise.resolve();
    }

    const alphaSpacesRegex = /^[a-zA-Z\s]+$/;
    if (!alphaSpacesRegex.test(value)) {
      return Promise.reject(new Error(t("alpha_spaces")));
    }
    if (value.length < minLength || value.length > maxLength) {
      return Promise.reject(
        new Error(
          t("between", {
            min: minLength,
            max: maxLength,
          })
        )
      );
    }
    return Promise.resolve();
  }

  return {
    alphaSpacesValidator,
  };
}
