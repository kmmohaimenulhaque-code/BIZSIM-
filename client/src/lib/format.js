export function formatNumber(n, opts = {}) {
  if (n == null || Number.isNaN(n)) return '—';
  return new Intl.NumberFormat(undefined, opts).format(n);
}

export function formatMoney(n, currency = 'USD') {
  if (n == null || Number.isNaN(n)) return '—';
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
    notation: Math.abs(n) >= 1e6 ? 'compact' : 'standard',
    maximumFractionDigits: 1,
  }).format(n);
}

export function truncate(s, n = 120) {
  if (!s) return '';
  s = String(s);
  return s.length <= n ? s : s.slice(0, n - 1) + '…';
}
