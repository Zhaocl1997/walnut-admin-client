export const adjustColor = (color: string, amount: number) =>
  '#' +
  color
    .replace(/^#/, '')
    .replace(/../g, (color) =>
      (
        '0' +
        Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)
      ).substr(-2)
    )

export const getThemeColors = (
  color: string,
  step = 10,
  count = 9
): [string, string[]] => [
  color,
  Array.from({ length: count }, (_, index: number) =>
    adjustColor(color, -(index * step))
  ),
]

// https://github.com/sindresorhus/rgb-hex
export const rgb2Hex = (
  red: StringOrNumber,
  green?: number,
  blue?: number,
  alpha?: StringOrNumber
) => {
  const isPercent = ((red as string) + (alpha || '')).toString().includes('%')

  if (typeof red === 'string') {
    ;[red, green, blue, alpha] = red
      .match(/(0?\.?\d{1,3})%?\b/g)!
      .map((component) => Number(component))
  } else if (alpha !== undefined) {
    alpha = Number.parseFloat(alpha as string)
  }

  if (
    typeof red !== 'number' ||
    typeof green !== 'number' ||
    typeof blue !== 'number' ||
    red > 255 ||
    green > 255 ||
    blue > 255
  ) {
    throw new TypeError('Expected three numbers below 256')
  }

  if (typeof alpha === 'number') {
    if (!isPercent && alpha >= 0 && alpha <= 1) {
      alpha = Math.round(255 * alpha)
    } else if (isPercent && alpha >= 0 && alpha <= 100) {
      alpha = Math.round((255 * alpha) / 100)
    } else {
      throw new TypeError(
        `Expected alpha value (${alpha}) as a fraction or percentage`
      )
    }

    alpha = (alpha | (1 << 8)).toString(16).slice(1)
  } else {
    alpha = ''
  }

  return `#${
    (blue | (green << 8) | (red << 16) | (1 << 24)).toString(16).slice(1) +
    alpha
  }`
}
