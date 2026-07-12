import { clamp, hexToHsl, hslToHex, isDark } from "@/lib/color";

export const DEFAULT_BACKGROUND = "#fafbf8";
export const DEFAULT_LINE = "#79bd94";

const THEME_STORAGE_KEY = "verstak-theme";

const BACKGROUND_KEYS = ["--color-paper", "--color-paper-alt", "--color-ink", "--color-ink-soft"];
const LINE_KEYS = ["--color-line", "--color-line-strong"];

export type ThemeVars = Record<string, string>;

/** Фон + производный оттенок для чередующихся секций + читаемый цвет текста */
export function buildBackgroundVars(baseHex: string): ThemeVars {
  const { h, s, l } = hexToHsl(baseHex);
  const dark = isDark(baseHex);

  return {
    "--color-paper": baseHex,
    "--color-paper-alt": hslToHex(h, s, clamp(l + (dark ? 6 : -4), 0, 100)),
    "--color-ink": dark ? "#f3f8f4" : "#12271d",
    "--color-ink-soft": dark ? "#b7c9bd" : "#4c6156",
  };
}

/** Тонкая линия (рамки, сетка) и жирная линия (разделители секций) одного оттенка */
export function buildLineVars(baseHex: string): ThemeVars {
  const { h, s } = hexToHsl(baseHex);

  return {
    "--color-line": hslToHex(h, clamp(s * 0.6, 0, 100), 85),
    "--color-line-strong": hslToHex(h, s, 55),
  };
}

export function applyThemeVars(vars: ThemeVars) {
  const root = document.documentElement;
  Object.entries(vars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}

export function saveTheme(background: string, line: string) {
  const vars = { ...buildBackgroundVars(background), ...buildLineVars(line) };
  try {
    localStorage.setItem(
      THEME_STORAGE_KEY,
      JSON.stringify({ background, line, vars }),
    );
  } catch {
    // localStorage недоступен (приватный режим и т.п.) — просто не сохраняем
  }
}

export function loadStoredTheme(): {
  background: string;
  line: string;
  vars: ThemeVars;
} | null {
  try {
    const raw = localStorage.getItem(THEME_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function resetTheme() {
  try {
    localStorage.removeItem(THEME_STORAGE_KEY);
  } catch {
    // ignore
  }
  const root = document.documentElement;
  [...BACKGROUND_KEYS, ...LINE_KEYS].forEach((key) =>
    root.style.removeProperty(key),
  );
}

/** Инлайн-скрипт для <head>: применяет сохранённую тему до первой отрисовки,
 *  чтобы не было "мигания" дефолтной палитрой при перезагрузке страницы. */
export const THEME_INIT_SCRIPT = `
(function () {
  try {
    var raw = localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
    if (!raw) return;
    var data = JSON.parse(raw);
    var vars = data && data.vars ? data.vars : {};
    var root = document.documentElement;
    for (var key in vars) {
      root.style.setProperty(key, vars[key]);
    }
  } catch (e) {}
})();
`;
