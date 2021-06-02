export const getAllEnumKeys = <T>(enumType: T) => {
  type type = keyof typeof enumType;
  return Object.keys(enumType)
    .filter((key) => isNaN(Number(key)))
    .map((key) => key as type);
};
