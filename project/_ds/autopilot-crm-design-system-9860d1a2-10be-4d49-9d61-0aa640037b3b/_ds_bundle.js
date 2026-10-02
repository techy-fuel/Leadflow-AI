/* @ds-bundle: {"format":3,"namespace":"AutoPilotCRMDesignSystem_9860d1","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"AiInsight","sourcePath":"components/data/AiInsight.jsx"},{"name":"LeadScore","sourcePath":"components/data/LeadScore.jsx"},{"name":"ProgressRing","sourcePath":"components/data/ProgressRing.jsx"},{"name":"StatCard","sourcePath":"components/data/StatCard.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"e4ae896b4e82","components/core/Badge.jsx":"7471866797b8","components/core/Button.jsx":"ded11b318c95","components/core/Card.jsx":"801c36044e38","components/core/IconButton.jsx":"00b831a28cd1","components/data/AiInsight.jsx":"9d0ac7caff07","components/data/LeadScore.jsx":"0b6465d4a02c","components/data/ProgressRing.jsx":"908c13f0977b","components/data/StatCard.jsx":"f61230409f63","components/forms/Input.jsx":"b5a407693cd1","components/forms/Select.jsx":"2fcd676f50a9","components/navigation/Tabs.jsx":"785858504d91","ui_kits/crm-web/app.jsx":"599017918a20","ui_kits/crm-web/assistant.jsx":"40615cac20ca","ui_kits/crm-web/charts.jsx":"fd612f2ec4d2","ui_kits/crm-web/dashboard.jsx":"2e11441d1138","ui_kits/crm-web/data.jsx":"e342e2b38569","ui_kits/crm-web/extras.jsx":"f31163bbac10","ui_kits/crm-web/icon.jsx":"2587c50b1e69","ui_kits/crm-web/inventory.jsx":"e3852c2ffb7a","ui_kits/crm-web/leads.jsx":"4135ea014ca1","ui_kits/crm-web/pipeline.jsx":"0783f9060eb7","ui_kits/crm-web/shell.jsx":"fd94e61dfbb2","ui_kits/landing/landing.jsx":"5eb13fa4b0fa","ui_kits/mobile/mobile.jsx":"50f27808dbf8"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.AutoPilotCRMDesignSystem_9860d1 = window.AutoPilotCRMDesignSystem_9860d1 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function initials(name = '') {
  return name.split(' ').filter(Boolean).slice(0, 2).map(n => n[0]).join('').toUpperCase();
}
const palette = ['#0A2540', '#059669', '#2563EB', '#7C3AED', '#D97706', '#0E7490'];
function colorFor(name = '') {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return palette[Math.abs(h) % palette.length];
}

/** User / customer avatar with image or generated initials. */
function Avatar({
  name = '',
  src = null,
  size = 40,
  status = null,
  style = {},
  ...rest
}) {
  const statusColors = {
    online: 'var(--emerald-500)',
    away: 'var(--amber-500)',
    offline: 'var(--slate-300)'
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      position: 'relative',
      display: 'inline-flex',
      flexShrink: 0,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: size,
      height: size,
      borderRadius: '50%',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      background: src ? 'var(--slate-200)' : colorFor(name),
      color: 'var(--white)',
      font: `var(--weight-bold) ${Math.round(size * 0.38)}px/1 var(--font-display)`,
      border: '2px solid var(--white)',
      boxShadow: 'var(--shadow-xs)'
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : initials(name)), status && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      width: Math.max(8, size * 0.26),
      height: Math.max(8, size * 0.26),
      borderRadius: '50%',
      background: statusColors[status] || statusColors.offline,
      border: '2px solid var(--white)'
    }
  }));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const tones = {
  navy: {
    bg: 'var(--navy-50)',
    fg: 'var(--navy-700)',
    bd: 'var(--navy-200)'
  },
  emerald: {
    bg: 'var(--emerald-50)',
    fg: 'var(--emerald-700)',
    bd: 'var(--emerald-200)'
  },
  amber: {
    bg: 'var(--amber-100)',
    fg: 'var(--amber-600)',
    bd: '#FCE3A8'
  },
  red: {
    bg: 'var(--red-100)',
    fg: 'var(--red-600)',
    bd: '#FBCFCF'
  },
  blue: {
    bg: 'var(--blue-100)',
    fg: 'var(--blue-600)',
    bd: '#C3D8FB'
  },
  violet: {
    bg: 'var(--violet-100)',
    fg: 'var(--violet-600)',
    bd: '#DDD2FB'
  },
  slate: {
    bg: 'var(--slate-100)',
    fg: 'var(--slate-600)',
    bd: 'var(--slate-200)'
  }
};

/** Compact status / category label. */
function Badge({
  children,
  tone = 'slate',
  dot = false,
  solid = false,
  size = 'md',
  style = {},
  ...rest
}) {
  const t = tones[tone] || tones.slate;
  const pad = size === 'sm' ? '2px 8px' : '3px 10px';
  const fs = size === 'sm' ? 11 : 12;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: pad,
      fontSize: fs,
      fontWeight: 600,
      fontFamily: 'var(--font-display)',
      letterSpacing: '0.01em',
      borderRadius: 'var(--radius-pill)',
      whiteSpace: 'nowrap',
      background: solid ? t.fg : t.bg,
      color: solid ? 'var(--white)' : t.fg,
      border: solid ? '1px solid transparent' : `1px solid ${t.bd}`,
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: solid ? 'var(--white)' : t.fg
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const sizes = {
  sm: {
    padding: '0 14px',
    height: 34,
    fontSize: 13,
    gap: 6,
    radius: 'var(--radius-sm)'
  },
  md: {
    padding: '0 18px',
    height: 42,
    fontSize: 14,
    gap: 8,
    radius: 'var(--radius-md)'
  },
  lg: {
    padding: '0 24px',
    height: 50,
    fontSize: 15,
    gap: 10,
    radius: 'var(--radius-md)'
  }
};
const variants = {
  primary: {
    background: 'var(--navy-900)',
    color: 'var(--white)',
    border: '1px solid var(--navy-900)'
  },
  accent: {
    background: 'var(--gradient-emerald)',
    color: 'var(--white)',
    border: '1px solid transparent',
    boxShadow: '0 1px 2px rgba(5,150,105,0.4), 0 6px 18px rgba(16,185,129,0.28)'
  },
  secondary: {
    background: 'var(--white)',
    color: 'var(--navy-900)',
    border: '1px solid var(--border-strong)'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--navy-700)',
    border: '1px solid transparent'
  },
  danger: {
    background: 'var(--red-600)',
    color: 'var(--white)',
    border: '1px solid var(--red-600)'
  }
};

/**
 * Primary action button for AutoPilot CRM.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft = null,
  iconRight = null,
  fullWidth = false,
  disabled = false,
  type = 'button',
  onClick,
  style = {},
  ...rest
}) {
  const s = sizes[size] || sizes.md;
  const v = variants[variant] || variants.primary;
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const hoverStyle = !disabled && hover ? {
    primary: {
      background: 'var(--navy-800)'
    },
    accent: {
      filter: 'brightness(1.05)'
    },
    secondary: {
      background: 'var(--slate-50)',
      borderColor: 'var(--slate-400)'
    },
    ghost: {
      background: 'var(--slate-100)'
    },
    danger: {
      background: 'var(--red-500)'
    }
  }[variant] : {};
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: s.gap,
      height: s.height,
      padding: s.padding,
      width: fullWidth ? '100%' : 'auto',
      font: `var(--weight-semibold) ${s.fontSize}px/1 var(--font-display)`,
      letterSpacing: 'var(--tracking-snug)',
      borderRadius: s.radius,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      whiteSpace: 'nowrap',
      transform: active ? 'translateY(1px)' : 'none',
      transition: 'background var(--dur-fast) var(--ease-out), filter var(--dur-fast), transform var(--dur-fast), border-color var(--dur-fast)',
      ...v,
      ...hoverStyle,
      ...style
    }
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Surface container — the base card used across the product. */
function Card({
  children,
  variant = 'default',
  padding = 'var(--space-6)',
  interactive = false,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const variants = {
    default: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-soft)',
      boxShadow: 'var(--shadow-card)'
    },
    flat: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-soft)',
      boxShadow: 'none'
    },
    sunken: {
      background: 'var(--surface-sunken)',
      border: '1px solid var(--border-soft)',
      boxShadow: 'none'
    },
    glass: {
      background: 'var(--surface-glass)',
      border: '1px solid rgba(255,255,255,0.6)',
      boxShadow: 'var(--shadow-lg)',
      backdropFilter: 'var(--blur-glass)',
      WebkitBackdropFilter: 'var(--blur-glass)'
    },
    navy: {
      background: 'var(--gradient-navy)',
      border: '1px solid var(--navy-700)',
      boxShadow: 'var(--shadow-lg)',
      color: 'var(--text-inverse)'
    }
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      borderRadius: 'var(--radius-lg)',
      padding,
      transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
      ...variants[variant],
      ...(interactive && hover ? {
        transform: 'translateY(-2px)',
        boxShadow: 'var(--shadow-lg)',
        cursor: 'pointer'
      } : {}),
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const sizes = {
  sm: {
    box: 30,
    radius: 'var(--radius-sm)'
  },
  md: {
    box: 38,
    radius: 'var(--radius-md)'
  },
  lg: {
    box: 46,
    radius: 'var(--radius-md)'
  }
};
const variants = {
  solid: {
    background: 'var(--navy-900)',
    color: 'var(--white)',
    border: '1px solid var(--navy-900)'
  },
  soft: {
    background: 'var(--slate-100)',
    color: 'var(--navy-800)',
    border: '1px solid transparent'
  },
  outline: {
    background: 'var(--white)',
    color: 'var(--navy-700)',
    border: '1px solid var(--border-strong)'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--slate-500)',
    border: '1px solid transparent'
  }
};

/** Square icon-only button. */
function IconButton({
  icon,
  variant = 'ghost',
  size = 'md',
  disabled = false,
  'aria-label': ariaLabel = 'button',
  onClick,
  style = {},
  ...rest
}) {
  const s = sizes[size] || sizes.md;
  const v = variants[variant] || variants.ghost;
  const [hover, setHover] = React.useState(false);
  const hoverBg = {
    solid: 'var(--navy-800)',
    soft: 'var(--slate-200)',
    outline: 'var(--slate-50)',
    ghost: 'var(--slate-100)'
  }[variant];
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": ariaLabel,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: s.box,
      height: s.box,
      borderRadius: s.radius,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      transition: 'background var(--dur-fast) var(--ease-out)',
      ...v,
      ...(hover && !disabled ? {
        background: hoverBg
      } : {}),
      ...style
    }
  }, rest), icon);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/data/AiInsight.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// AutoPilot CRM — AI insight card
const tones = {
  default: {
    glyph: '✦',
    ring: 'rgba(16,185,129,0.4)'
  },
  opportunity: {
    glyph: '▲',
    ring: 'rgba(16,185,129,0.4)'
  },
  alert: {
    glyph: '!',
    ring: 'rgba(245,158,11,0.45)'
  },
  action: {
    glyph: '→',
    ring: 'rgba(37,99,235,0.4)'
  }
};

/** AI recommendation / insight card — the signature "intelligence" surface. */
function AiInsight({
  children,
  title = 'AI Insight',
  tone = 'default',
  meta = null,
  action = null,
  style = {},
  ...rest
}) {
  const t = tones[tone] || tones.default;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: 'relative',
      display: 'flex',
      gap: 14,
      padding: 'var(--space-4)',
      borderRadius: 'var(--radius-md)',
      background: 'linear-gradient(180deg, rgba(16,185,129,0.05) 0%, rgba(255,255,255,0) 100%), var(--white)',
      border: '1px solid var(--emerald-100)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      width: 38,
      height: 38,
      borderRadius: 'var(--radius-sm)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--gradient-emerald)',
      color: 'var(--white)',
      fontSize: 17,
      fontWeight: 700,
      boxShadow: `0 0 0 4px ${t.ring}`
    }
  }, t.glyph), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--weight-bold) 11px/1 var(--font-display)',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--emerald-700)'
    }
  }, title), meta && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--weight-medium) 11px/1 var(--font-body)',
      color: 'var(--text-subtle)'
    }
  }, meta)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: 'var(--weight-medium) 14px/1.5 var(--font-body)',
      color: 'var(--text-body)',
      textWrap: 'pretty'
    }
  }, children), action && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12
    }
  }, action)));
}
Object.assign(__ds_scope, { AiInsight });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/AiInsight.jsx", error: String((e && e.message) || e) }); }

// components/data/LeadScore.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const temps = {
  hot: {
    label: 'Hot',
    fg: 'var(--lead-hot)',
    bg: 'var(--lead-hot-bg)',
    bar: 'var(--lead-hot)'
  },
  warm: {
    label: 'Warm',
    fg: 'var(--lead-warm)',
    bg: 'var(--lead-warm-bg)',
    bar: 'var(--lead-warm)'
  },
  cold: {
    label: 'Cold',
    fg: 'var(--lead-cold)',
    bg: 'var(--lead-cold-bg)',
    bar: 'var(--lead-cold)'
  }
};
function tempFor(score) {
  if (score >= 70) return 'hot';
  if (score >= 40) return 'warm';
  return 'cold';
}

/** AI lead-score indicator — temperature + 0-100 score with a mini bar. */
function LeadScore({
  score = 0,
  temperature = null,
  showBar = true,
  size = 'md',
  style = {},
  ...rest
}) {
  const temp = temperature || tempFor(score);
  const t = temps[temp] || temps.cold;
  const compact = size === 'sm';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: compact ? '2px 8px' : '4px 10px',
      borderRadius: 'var(--radius-pill)',
      background: t.bg,
      color: t.fg,
      font: `var(--weight-bold) ${compact ? 11 : 12}px/1 var(--font-display)`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: t.bar
    }
  }), t.label), showBar && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 64,
      height: 6,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--slate-150)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${Math.min(100, Math.max(0, score))}%`,
      height: '100%',
      background: t.bar,
      borderRadius: 'var(--radius-pill)'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--weight-bold) 13px/1 var(--font-display)',
      color: 'var(--text-strong)',
      fontVariantNumeric: 'tabular-nums',
      minWidth: 22
    }
  }, score)));
}
Object.assign(__ds_scope, { LeadScore });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/LeadScore.jsx", error: String((e && e.message) || e) }); }

// components/data/ProgressRing.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// AutoPilot CRM — circular progress ring
/** Circular progress ring — for AI Sales Score, conversion %, etc. */
function ProgressRing({
  value = 0,
  size = 96,
  stroke = 9,
  color = 'var(--emerald-500)',
  track = 'var(--slate-150)',
  label = null,
  sublabel = null,
  gradient = true,
  style = {},
  ...rest
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.min(100, Math.max(0, value));
  const offset = c - pct / 100 * c;
  const gid = React.useMemo(() => 'pr' + Math.random().toString(36).slice(2, 8), []);
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: 'relative',
      width: size,
      height: size,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    style: {
      transform: 'rotate(-90deg)'
    }
  }, gradient && /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: gid,
    x1: "0",
    y1: "0",
    x2: "1",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#34D399"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#059669"
  }))), /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: track,
    strokeWidth: stroke
  }), /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: gradient ? `url(#${gid})` : color,
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeDasharray: c,
    strokeDashoffset: offset,
    style: {
      transition: 'stroke-dashoffset var(--dur-slow) var(--ease-out)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: `var(--weight-extra) ${Math.round(size * 0.27)}px/1 var(--font-display)`,
      color: 'var(--text-strong)',
      letterSpacing: '-0.02em'
    }
  }, label ?? `${Math.round(pct)}`), sublabel && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--weight-semibold) 10px/1 var(--font-display)',
      color: 'var(--text-muted)',
      letterSpacing: '0.04em',
      textTransform: 'uppercase'
    }
  }, sublabel)));
}
Object.assign(__ds_scope, { ProgressRing });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ProgressRing.jsx", error: String((e && e.message) || e) }); }

// components/data/StatCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** KPI / metric tile for the dashboard. */
function StatCard({
  label,
  value,
  delta = null,
  trend = 'up',
  icon = null,
  accent = 'navy',
  sparkline = null,
  style = {},
  ...rest
}) {
  const accents = {
    navy: 'var(--navy-900)',
    emerald: 'var(--emerald-600)',
    amber: 'var(--amber-500)',
    blue: 'var(--blue-600)',
    violet: 'var(--violet-600)'
  };
  const trendColor = trend === 'up' ? 'var(--emerald-700)' : trend === 'down' ? 'var(--red-600)' : 'var(--slate-500)';
  const trendBg = trend === 'up' ? 'var(--emerald-50)' : trend === 'down' ? 'var(--red-100)' : 'var(--slate-100)';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-soft)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-5)',
      boxShadow: 'var(--shadow-card)',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--weight-semibold) 13px/1 var(--font-display)',
      color: 'var(--text-muted)',
      letterSpacing: '0.01em'
    }
  }, label), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 34,
      height: 34,
      borderRadius: 'var(--radius-sm)',
      background: 'var(--slate-50)',
      color: accents[accent] || accents.navy
    }
  }, icon)), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-extra) 30px/1 var(--font-display)',
      color: 'var(--text-strong)',
      letterSpacing: '-0.02em',
      fontVariantNumeric: 'tabular-nums'
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8
    }
  }, delta != null && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      padding: '3px 8px',
      borderRadius: 'var(--radius-pill)',
      background: trendBg,
      color: trendColor,
      font: 'var(--weight-bold) 12px/1 var(--font-display)'
    }
  }, trend === 'up' ? '▲' : trend === 'down' ? '▼' : '—', " ", delta), sparkline));
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Text input with optional leading icon and label. */
function Input({
  label = null,
  hint = null,
  error = null,
  iconLeft = null,
  iconRight = null,
  size = 'md',
  style = {},
  containerStyle = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const h = size === 'sm' ? 36 : size === 'lg' ? 50 : 44;
  const fs = size === 'sm' ? 13 : 14;
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...containerStyle
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--weight-semibold) 13px/1 var(--font-display)',
      color: 'var(--text-body)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      height: h,
      padding: '0 14px',
      background: 'var(--white)',
      border: `1px solid ${error ? 'var(--red-500)' : focus ? 'var(--emerald-500)' : 'var(--border-strong)'}`,
      borderRadius: 'var(--radius-md)',
      boxShadow: focus ? 'var(--shadow-focus)' : 'none',
      transition: 'border-color var(--dur-fast), box-shadow var(--dur-fast)'
    }
  }, iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--slate-400)',
      display: 'inline-flex'
    }
  }, iconLeft), /*#__PURE__*/React.createElement("input", _extends({
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      font: `var(--weight-medium) ${fs}px/1 var(--font-body)`,
      color: 'var(--text-strong)',
      minWidth: 0,
      ...style
    }
  }, rest)), iconRight && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--slate-400)',
      display: 'inline-flex'
    }
  }, iconRight)), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--weight-medium) 12px/1.4 var(--font-body)',
      color: error ? 'var(--red-600)' : 'var(--text-muted)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Native-backed select styled to match Input. */
function Select({
  label = null,
  options = [],
  value,
  onChange,
  size = 'md',
  style = {},
  containerStyle = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const h = size === 'sm' ? 36 : size === 'lg' ? 50 : 44;
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...containerStyle
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--weight-semibold) 13px/1 var(--font-display)',
      color: 'var(--text-body)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      height: h,
      background: 'var(--white)',
      border: `1px solid ${focus ? 'var(--emerald-500)' : 'var(--border-strong)'}`,
      borderRadius: 'var(--radius-md)',
      boxShadow: focus ? 'var(--shadow-focus)' : 'none',
      transition: 'border-color var(--dur-fast), box-shadow var(--dur-fast)'
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    value: value,
    onChange: onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      appearance: 'none',
      WebkitAppearance: 'none',
      flex: 1,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      padding: '0 36px 0 14px',
      height: '100%',
      font: 'var(--weight-medium) 14px/1 var(--font-body)',
      color: 'var(--text-strong)',
      cursor: 'pointer',
      ...style
    }
  }, rest), options.map(o => {
    const opt = typeof o === 'string' ? {
      value: o,
      label: o
    } : o;
    return /*#__PURE__*/React.createElement("option", {
      key: opt.value,
      value: opt.value
    }, opt.label);
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 14,
      pointerEvents: 'none',
      color: 'var(--slate-400)',
      fontSize: 12
    }
  }, "\u25BE")));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// AutoPilot CRM — tab navigation
/** Underline / segmented tab navigation. */
function Tabs({
  tabs = [],
  value,
  onChange,
  variant = 'underline',
  style = {},
  ...rest
}) {
  const active = value ?? (tabs[0] && (tabs[0].value ?? tabs[0]));
  const norm = tabs.map(t => typeof t === 'string' ? {
    value: t,
    label: t
  } : t);
  if (variant === 'pill') {
    return /*#__PURE__*/React.createElement("div", _extends({
      style: {
        display: 'inline-flex',
        gap: 4,
        padding: 4,
        background: 'var(--slate-100)',
        borderRadius: 'var(--radius-md)',
        ...style
      }
    }, rest), norm.map(t => {
      const on = t.value === active;
      return /*#__PURE__*/React.createElement("button", {
        key: t.value,
        type: "button",
        onClick: () => onChange && onChange(t.value),
        style: {
          border: 'none',
          cursor: 'pointer',
          padding: '8px 16px',
          borderRadius: 'var(--radius-sm)',
          font: 'var(--weight-semibold) 13px/1 var(--font-display)',
          background: on ? 'var(--white)' : 'transparent',
          color: on ? 'var(--navy-900)' : 'var(--text-muted)',
          boxShadow: on ? 'var(--shadow-sm)' : 'none',
          transition: 'all var(--dur-fast) var(--ease-out)'
        }
      }, t.label, t.count != null && /*#__PURE__*/React.createElement("span", {
        style: {
          marginLeft: 6,
          opacity: 0.6
        }
      }, t.count));
    }));
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      gap: 26,
      borderBottom: '1px solid var(--border-soft)',
      ...style
    }
  }, rest), norm.map(t => {
    const on = t.value === active;
    return /*#__PURE__*/React.createElement("button", {
      key: t.value,
      type: "button",
      onClick: () => onChange && onChange(t.value),
      style: {
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        padding: '0 0 14px',
        position: 'relative',
        font: `var(--weight-${on ? 'bold' : 'medium'}) 14px/1 var(--font-display)`,
        color: on ? 'var(--navy-900)' : 'var(--text-muted)',
        transition: 'color var(--dur-fast)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7
      }
    }, t.label, t.count != null && /*#__PURE__*/React.createElement("span", {
      style: {
        padding: '1px 7px',
        borderRadius: 'var(--radius-pill)',
        fontSize: 11,
        background: on ? 'var(--emerald-50)' : 'var(--slate-100)',
        color: on ? 'var(--emerald-700)' : 'var(--text-muted)'
      }
    }, t.count)), on && /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: -1,
        height: 2,
        background: 'var(--emerald-600)',
        borderRadius: '2px 2px 0 0'
      }
    }));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/crm-web/app.jsx
try { (() => {
// Main CRM app — navigation + screen routing.
(function () {
  const TITLES = {
    dashboard: ['Dashboard', "Tuesday, 17 June · Here's your dealership at a glance"],
    inventory: ['Inventory', '142 vehicles · 118 available'],
    leads: ['Leads', '128 active leads · 14 hot'],
    pipeline: ['Sales Pipeline', 'Drag deals across stages'],
    assistant: ['AI Assistant', 'Your dealership copilot'],
    whatsapp: ['WhatsApp Automation', 'Visual workflow builder'],
    finance: ['Finance Calculator', 'Build a financing plan'],
    reports: ['Reports & Analytics', 'Performance & AI forecasting']
  };
  function App() {
    const [active, setActive] = React.useState('dashboard');
    const Screen = {
      dashboard: window.Dashboard,
      inventory: window.Inventory,
      leads: window.Leads,
      pipeline: window.Pipeline,
      assistant: window.Assistant,
      whatsapp: window.WhatsApp,
      finance: window.Finance,
      reports: window.Reports
    }[active];
    const [title, subtitle] = TITLES[active];
    const fill = active === 'assistant';
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
        background: 'var(--bg-app)'
      }
    }, /*#__PURE__*/React.createElement(window.Sidebar, {
      active: active,
      onNav: setActive
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement(window.Topbar, {
      title: title,
      subtitle: subtitle
    }), /*#__PURE__*/React.createElement("main", {
      style: {
        flex: 1,
        overflow: fill ? 'hidden' : 'auto',
        padding: fill ? 22 : '24px 28px'
      }
    }, Screen ? /*#__PURE__*/React.createElement(Screen, null) : null)));
  }
  function mount() {
    if (window.lucide) window.lucide.createIcons();
    ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
  }
  mount();
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/crm-web/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/crm-web/assistant.jsx
try { (() => {
// AI Sales Assistant (Copilot) screen — chat interface.
(function () {
  const DS = window.AutoPilotCRMDesignSystem_9860d1;
  const SUGGESTIONS = [{
    icon: 'message-square-text',
    text: 'Draft a WhatsApp follow-up for Ahmed Khan'
  }, {
    icon: 'list-checks',
    text: 'What should I do next today?'
  }, {
    icon: 'file-text',
    text: "Summarize Sara Malik's history"
  }, {
    icon: 'percent',
    text: 'Predict closing chance for my hot leads'
  }];
  const CANNED = {
    default: "Here's what I'd prioritise. **Ahmed Khan** has an 82% closing probability — he responded positively to financing on the Corolla. I've drafted a WhatsApp message you can send in one tap. After that, 12 uncontacted leads need attention; two are scored Hot.",
    whatsapp: "Here's a WhatsApp draft for **Ahmed Khan**:\n\n\"Hi Ahmed! Great news — we can offer the 2021 Corolla at AED 64,500 with 0% down for the first 3 months. Would tomorrow at 5pm work for a quick test drive? 🚗\"",
    summary: "**Sara Malik** has viewed the Tesla Model 3 listing 4 times this week and booked a test drive for Saturday. She responded positively to the EV charging incentive. Estimated closing probability: 78%. Recommended next step: confirm the test drive and prepare a finance quote."
  };
  function Assistant() {
    const {
      Button
    } = DS;
    const [msgs, setMsgs] = React.useState([{
      role: 'ai',
      text: 'Good morning, Rashid. You have **38 active deals** and **3 closing today**. Ask me anything about your dealership.'
    }]);
    const [input, setInput] = React.useState('');
    const scrollRef = React.useRef(null);
    React.useEffect(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [msgs]);
    const send = text => {
      if (!text.trim()) return;
      const lower = text.toLowerCase();
      const reply = lower.includes('whatsapp') || lower.includes('follow-up') ? CANNED.whatsapp : lower.includes('summar') ? CANNED.summary : CANNED.default;
      setMsgs(m => [...m, {
        role: 'user',
        text
      }, {
        role: 'ai',
        text: reply
      }]);
      setInput('');
    };
    const fmt = t => t.split('**').map((s, i) => i % 2 ? /*#__PURE__*/React.createElement("strong", {
      key: i
    }, s) : s);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: '#fff',
        border: '1px solid var(--border-soft)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-card)',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '16px 22px',
        borderBottom: '1px solid var(--divider)',
        background: 'linear-gradient(180deg, rgba(16,185,129,0.05), transparent)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 40,
        height: 40,
        borderRadius: 12,
        background: 'var(--gradient-emerald)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        boxShadow: 'var(--glow-emerald)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "sparkles",
      size: 20
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 800,
        color: 'var(--text-strong)',
        fontFamily: 'var(--font-display)'
      }
    }, "AutoPilot Copilot"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: 'var(--emerald-700)',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: 5
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 7,
        height: 7,
        borderRadius: '50%',
        background: 'var(--emerald-500)'
      }
    }), " Online \xB7 trained on your dealership"))), /*#__PURE__*/React.createElement("div", {
      ref: scrollRef,
      style: {
        flex: 1,
        overflowY: 'auto',
        padding: 22,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        background: 'var(--slate-50)'
      }
    }, msgs.map((m, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        gap: 10,
        maxWidth: '76%',
        alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
        flexDirection: m.role === 'user' ? 'row-reverse' : 'row'
      }
    }, m.role === 'ai' && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 30,
        height: 30,
        borderRadius: 9,
        background: 'var(--gradient-emerald)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "sparkles",
      size: 15
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '12px 15px',
        borderRadius: m.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
        background: m.role === 'user' ? 'var(--navy-900)' : '#fff',
        color: m.role === 'user' ? '#fff' : 'var(--text-body)',
        border: m.role === 'user' ? 'none' : '1px solid var(--border-soft)',
        fontSize: 14,
        lineHeight: 1.55,
        whiteSpace: 'pre-wrap',
        boxShadow: m.role === 'ai' ? 'var(--shadow-xs)' : 'none'
      }
    }, fmt(m.text))))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 16,
        borderTop: '1px solid var(--divider)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8,
        marginBottom: 12,
        flexWrap: 'wrap'
      }
    }, SUGGESTIONS.map((s, i) => /*#__PURE__*/React.createElement("button", {
      key: i,
      onClick: () => send(s.text),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        padding: '8px 12px',
        border: '1px solid var(--border-soft)',
        background: '#fff',
        borderRadius: 999,
        fontSize: 12.5,
        fontWeight: 600,
        color: 'var(--text-body)',
        cursor: 'pointer',
        fontFamily: 'var(--font-display)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: s.icon,
      size: 14,
      color: "var(--emerald-600)"
    }), " ", s.text))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 10,
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        height: 48,
        padding: '0 16px',
        background: 'var(--slate-50)',
        border: '1px solid var(--border-strong)',
        borderRadius: 'var(--radius-pill)'
      }
    }, /*#__PURE__*/React.createElement("input", {
      value: input,
      onChange: e => setInput(e.target.value),
      onKeyDown: e => e.key === 'Enter' && send(input),
      placeholder: "Ask your AI sales assistant\u2026",
      style: {
        flex: 1,
        border: 'none',
        outline: 'none',
        background: 'none',
        fontSize: 14,
        fontFamily: 'var(--font-body)'
      }
    })), /*#__PURE__*/React.createElement(Button, {
      variant: "accent",
      size: "lg",
      onClick: () => send(input),
      iconRight: /*#__PURE__*/React.createElement(Icon, {
        name: "arrow-up",
        size: 16
      })
    }, "Send"))));
  }
  window.Assistant = Assistant;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/crm-web/assistant.jsx", error: String((e && e.message) || e) }); }

// ui_kits/crm-web/charts.jsx
try { (() => {
// Lightweight SVG data-viz for the CRM kit (charts are data, not iconography).

function AreaChart({
  data = SALES_SERIES,
  width = 640,
  height = 200,
  pad = 24
}) {
  const max = Math.max(...data) * 1.12;
  const w = width - pad * 2,
    h = height - pad * 2;
  const pts = data.map((v, i) => [pad + i / (data.length - 1) * w, pad + h - v / max * h]);
  const line = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const area = line + ` L${pad + w} ${pad + h} L${pad} ${pad + h} Z`;
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${width} ${height}`,
    style: {
      width: '100%',
      height: 'auto',
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "acFill",
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#10B981",
    stopOpacity: "0.22"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#10B981",
    stopOpacity: "0"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "acLine",
    x1: "0",
    y1: "0",
    x2: "1",
    y2: "0"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#059669"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#10B981"
  }))), [0.25, 0.5, 0.75, 1].map((g, i) => /*#__PURE__*/React.createElement("line", {
    key: i,
    x1: pad,
    x2: width - pad,
    y1: pad + h * g,
    y2: pad + h * g,
    stroke: "#EDF1F6",
    strokeWidth: "1"
  })), /*#__PURE__*/React.createElement("path", {
    d: area,
    fill: "url(#acFill)"
  }), /*#__PURE__*/React.createElement("path", {
    d: line,
    fill: "none",
    stroke: "url(#acLine)",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), pts.map((p, i) => i === pts.length - 1 && /*#__PURE__*/React.createElement("circle", {
    key: i,
    cx: p[0],
    cy: p[1],
    r: "5",
    fill: "#fff",
    stroke: "#059669",
    strokeWidth: "3"
  })));
}
function Funnel({
  data = FUNNEL
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, data.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 88,
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--text-muted)'
    }
  }, d.label), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 28,
      background: 'var(--slate-100)',
      borderRadius: 8,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: d.pct + '%',
      height: '100%',
      borderRadius: 8,
      background: `linear-gradient(90deg, #0A2540, #059669)`,
      opacity: 1 - i * 0.13,
      display: 'flex',
      alignItems: 'center',
      paddingLeft: 12,
      boxSizing: 'border-box',
      color: '#fff',
      fontSize: 12,
      fontWeight: 700,
      fontFamily: 'var(--font-display)'
    }
  }, d.value)), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 38,
      textAlign: 'right',
      fontSize: 12,
      fontWeight: 700,
      color: 'var(--text-strong)'
    }
  }, d.pct, "%"))));
}
function Sparkline({
  data,
  color = '#059669',
  width = 96,
  height = 32
}) {
  const max = Math.max(...data),
    min = Math.min(...data);
  const pts = data.map((v, i) => [i / (data.length - 1) * width, height - (v - min) / (max - min || 1) * height]);
  const line = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  return /*#__PURE__*/React.createElement("svg", {
    width: width,
    height: height,
    style: {
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: line,
    fill: "none",
    stroke: color,
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
}

// Vehicle image placeholder — gradient tile + car glyph (no external photos).
function VehicleThumb({
  color = '#1F4E79',
  size = 56,
  radius = 12
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      borderRadius: radius,
      flexShrink: 0,
      background: `linear-gradient(150deg, ${color}, ${color}cc)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'rgba(255,255,255,0.92)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "car-front",
    size: size * 0.42,
    strokeWidth: 1.8
  }));
}
Object.assign(window, {
  AreaChart,
  Funnel,
  Sparkline,
  VehicleThumb
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/crm-web/charts.jsx", error: String((e && e.message) || e) }); }

// ui_kits/crm-web/dashboard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Dashboard screen.
(function () {
  const DS = window.AutoPilotCRMDesignSystem_9860d1;
  function SectionCard({
    title,
    action,
    children,
    pad = 20,
    style = {}
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'var(--white)',
        border: '1px solid var(--border-soft)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-card)',
        ...style
      }
    }, title && /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 20px',
        borderBottom: '1px solid var(--divider)'
      }
    }, /*#__PURE__*/React.createElement("h3", {
      style: {
        margin: 0,
        font: 'var(--weight-bold) 15px/1 var(--font-display)',
        color: 'var(--text-strong)'
      }
    }, title), action), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: pad
      }
    }, children));
  }
  function Dashboard() {
    const {
      StatCard,
      AiInsight,
      ProgressRing,
      Badge,
      Button
    } = DS;
    const stats = [{
      label: 'Total Vehicles',
      value: '142',
      delta: '6',
      trend: 'up',
      accent: 'navy',
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "car-front",
        size: 18
      })
    }, {
      label: 'Active Leads',
      value: '128',
      delta: '18%',
      trend: 'up',
      accent: 'blue',
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "users",
        size: 18
      })
    }, {
      label: 'Sold This Month',
      value: '38',
      delta: '12%',
      trend: 'up',
      accent: 'emerald',
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "badge-check",
        size: 18
      })
    }, {
      label: 'Revenue (MTD)',
      value: 'AED 4.2M',
      delta: '8.1%',
      trend: 'up',
      accent: 'emerald',
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "trending-up",
        size: 18
      })
    }, {
      label: 'Conversion Rate',
      value: '24.6%',
      delta: '1.2%',
      trend: 'down',
      accent: 'amber',
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "target",
        size: 18
      })
    }];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 18
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: 14
      }
    }, stats.map((s, i) => /*#__PURE__*/React.createElement(StatCard, _extends({
      key: i
    }, s)))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1.6fr 1fr',
        gap: 18
      }
    }, /*#__PURE__*/React.createElement(SectionCard, {
      title: "Sales Analytics",
      action: /*#__PURE__*/React.createElement(Badge, {
        tone: "emerald",
        dot: true
      }, "+18% YoY")
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 24,
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: 'var(--text-muted)',
        fontWeight: 600
      }
    }, "Units sold"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 26,
        fontWeight: 800,
        color: 'var(--text-strong)',
        fontFamily: 'var(--font-display)',
        letterSpacing: '-0.02em'
      }
    }, "682")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: 'var(--text-muted)',
        fontWeight: 600
      }
    }, "Avg. deal"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 26,
        fontWeight: 800,
        color: 'var(--text-strong)',
        fontFamily: 'var(--font-display)',
        letterSpacing: '-0.02em'
      }
    }, "AED 112K"))), /*#__PURE__*/React.createElement(AreaChart, null), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 6
      }
    }, window.MONTHS.map(m => /*#__PURE__*/React.createElement("span", {
      key: m,
      style: {
        fontSize: 10,
        color: 'var(--text-subtle)',
        fontWeight: 600
      }
    }, m)))), /*#__PURE__*/React.createElement(SectionCard, {
      title: "Lead Funnel"
    }, /*#__PURE__*/React.createElement(Funnel, null))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1.6fr 1fr',
        gap: 18
      }
    }, /*#__PURE__*/React.createElement(SectionCard, {
      title: "AI Recommendations",
      action: /*#__PURE__*/React.createElement(Icon, {
        name: "sparkles",
        size: 16,
        color: "var(--emerald-600)"
      })
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(AiInsight, {
      tone: "opportunity",
      meta: "2m ago",
      action: /*#__PURE__*/React.createElement(Button, {
        variant: "accent",
        size: "sm",
        iconRight: /*#__PURE__*/React.createElement(Icon, {
          name: "arrow-right",
          size: 14
        })
      }, "View vehicle")
    }, /*#__PURE__*/React.createElement("strong", null, "Toyota Corolla 2021"), " is receiving 3\xD7 more inquiries than average \u2014 consider featuring it on the homepage."), /*#__PURE__*/React.createElement(AiInsight, {
      tone: "alert",
      meta: "now"
    }, /*#__PURE__*/React.createElement("strong", null, "12 leads"), " have not been contacted in the last 24 hours. Two are scored Hot."), /*#__PURE__*/React.createElement(AiInsight, {
      tone: "action",
      meta: "live",
      action: /*#__PURE__*/React.createElement(Button, {
        variant: "secondary",
        size: "sm"
      }, "Call now")
    }, "Follow up with ", /*#__PURE__*/React.createElement("strong", null, "Ahmed Khan"), " now \u2014 closing probability ", /*#__PURE__*/React.createElement("strong", null, "82%"), "."))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 18
      }
    }, /*#__PURE__*/React.createElement(SectionCard, {
      title: "AI Sales Score"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 18
      }
    }, /*#__PURE__*/React.createElement(ProgressRing, {
      value: 82,
      size: 104,
      sublabel: "Score"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: 'var(--text-muted)',
        lineHeight: 1.5
      }
    }, "Strong month. ", /*#__PURE__*/React.createElement("strong", {
      style: {
        color: 'var(--emerald-700)'
      }
    }, "Response time"), " and ", /*#__PURE__*/React.createElement("strong", {
      style: {
        color: 'var(--emerald-700)'
      }
    }, "follow-up rate"), " are driving your score up."))), /*#__PURE__*/React.createElement(SectionCard, {
      title: "Top Performing Vehicles",
      pad: 14
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10
      }
    }, window.VEHICLES.slice(0, 3).map(v => /*#__PURE__*/React.createElement("div", {
      key: v.id,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(VehicleThumb, {
      color: v.color,
      size: 42,
      radius: 10
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: 'var(--text-strong)'
      }
    }, v.make, " ", v.model), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: 'var(--text-muted)'
      }
    }, v.year, " \xB7 ", v.price)), /*#__PURE__*/React.createElement(Sparkline, {
      data: [3, 5, 4, 7, 6, 9, 8]
    }))))))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 18
      }
    }, /*#__PURE__*/React.createElement(SectionCard, {
      title: "Upcoming Follow-Ups",
      action: /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 12,
          fontWeight: 600,
          color: 'var(--text-link)',
          cursor: 'pointer'
        }
      }, "View all")
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 12
      }
    }, window.LEADS.slice(0, 4).map(l => /*#__PURE__*/React.createElement("div", {
      key: l.id,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(DS.Avatar, {
      name: l.name,
      size: 36
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: 'var(--text-strong)'
      }
    }, l.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: 'var(--text-muted)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, l.vehicle)), /*#__PURE__*/React.createElement(DS.LeadScore, {
      score: l.score,
      showBar: false,
      size: "sm"
    }), /*#__PURE__*/React.createElement(DS.IconButton, {
      variant: "soft",
      size: "sm",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "phone",
        size: 14
      }),
      "aria-label": "Call"
    }))))), /*#__PURE__*/React.createElement(SectionCard, {
      title: "Recent Activities"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 14
      }
    }, window.ACTIVITIES.map((a, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 34,
        height: 34,
        borderRadius: 10,
        background: a.tone + '14',
        color: a.tone,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: a.icon,
      size: 16
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        fontSize: 13,
        color: 'var(--text-body)'
      }
    }, /*#__PURE__*/React.createElement("strong", {
      style: {
        color: 'var(--text-strong)'
      }
    }, a.who), " ", a.action), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: 'var(--text-subtle)',
        whiteSpace: 'nowrap'
      }
    }, a.time)))))));
  }
  Object.assign(window, {
    Dashboard,
    SectionCard
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/crm-web/dashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/crm-web/data.jsx
try { (() => {
// Mock dealership data for AutoPilot CRM UI kit.
const VEHICLES = [{
  id: 1,
  make: 'Toyota',
  model: 'Corolla',
  year: 2021,
  mileage: '42,000 km',
  fuel: 'Petrol',
  trans: 'Automatic',
  price: 'AED 64,500',
  status: 'Available',
  tone: 'emerald',
  hot: true,
  color: '#1F4E79'
}, {
  id: 2,
  make: 'Nissan',
  model: 'Patrol',
  year: 2022,
  mileage: '28,500 km',
  fuel: 'Petrol',
  trans: 'Automatic',
  price: 'AED 245,000',
  status: 'Reserved',
  tone: 'amber',
  color: '#0E2E4D'
}, {
  id: 3,
  make: 'Honda',
  model: 'Civic',
  year: 2020,
  mileage: '55,200 km',
  fuel: 'Petrol',
  trans: 'CVT',
  price: 'AED 58,000',
  status: 'Available',
  tone: 'emerald',
  color: '#475569'
}, {
  id: 4,
  make: 'BMW',
  model: '320i',
  year: 2021,
  mileage: '38,900 km',
  fuel: 'Petrol',
  trans: 'Automatic',
  price: 'AED 132,000',
  status: 'Available',
  tone: 'emerald',
  color: '#1E293B'
}, {
  id: 5,
  make: 'Tesla',
  model: 'Model 3',
  year: 2023,
  mileage: '12,400 km',
  fuel: 'Electric',
  trans: 'Automatic',
  price: 'AED 178,000',
  status: 'Available',
  tone: 'emerald',
  hot: true,
  color: '#7C3AED'
}, {
  id: 6,
  make: 'Mercedes',
  model: 'C200',
  year: 2022,
  mileage: '31,000 km',
  fuel: 'Petrol',
  trans: 'Automatic',
  price: 'AED 168,500',
  status: 'Sold',
  tone: 'slate',
  color: '#334155'
}, {
  id: 7,
  make: 'Lexus',
  model: 'RX 350',
  year: 2021,
  mileage: '47,800 km',
  fuel: 'Petrol',
  trans: 'Automatic',
  price: 'AED 195,000',
  status: 'Available',
  tone: 'emerald',
  color: '#0E7490'
}];
const LEADS = [{
  id: 1,
  name: 'Ahmed Khan',
  phone: '+971 50 123 4567',
  vehicle: 'Toyota Corolla 2021',
  source: 'WhatsApp',
  score: 86,
  status: 'Negotiation',
  note: 'Responded positively to financing',
  last: '2h ago'
}, {
  id: 2,
  name: 'Sara Malik',
  phone: '+971 55 987 6543',
  vehicle: 'Tesla Model 3 2023',
  source: 'Website',
  score: 78,
  status: 'Test Drive',
  note: 'Booked test drive Saturday',
  last: '5h ago'
}, {
  id: 3,
  name: 'Omar Farooq',
  phone: '+971 52 444 1212',
  vehicle: 'BMW 320i 2021',
  source: 'Instagram',
  score: 64,
  status: 'Interested',
  note: 'Comparing with Audi A4',
  last: '1d ago'
}, {
  id: 4,
  name: 'Fatima Noor',
  phone: '+971 56 222 8989',
  vehicle: 'Lexus RX 350',
  source: 'Referral',
  score: 52,
  status: 'Contacted',
  note: 'Wants weekend viewing',
  last: '1d ago'
}, {
  id: 5,
  name: 'James Carter',
  phone: '+971 50 778 3434',
  vehicle: 'Nissan Patrol 2022',
  source: 'WhatsApp',
  score: 41,
  status: 'New Lead',
  note: 'Asked about trade-in',
  last: '2d ago'
}, {
  id: 6,
  name: 'Layla Hassan',
  phone: '+971 54 661 0099',
  vehicle: 'Honda Civic 2020',
  source: 'Walk-in',
  score: 33,
  status: 'Contacted',
  note: 'Budget conscious',
  last: '3d ago'
}];
const PIPELINE = [{
  key: 'new',
  title: 'New Lead',
  tone: '#64748B'
}, {
  key: 'contacted',
  title: 'Contacted',
  tone: '#2563EB'
}, {
  key: 'interested',
  title: 'Interested',
  tone: '#0E7490'
}, {
  key: 'testdrive',
  title: 'Test Drive',
  tone: '#7C3AED'
}, {
  key: 'negotiation',
  title: 'Negotiation',
  tone: '#D97706'
}, {
  key: 'booked',
  title: 'Booked',
  tone: '#059669'
}, {
  key: 'sold',
  title: 'Sold',
  tone: '#0A2540'
}];
const PIPELINE_CARDS = {
  new: [{
    name: 'James Carter',
    vehicle: 'Nissan Patrol',
    score: 41,
    last: '2d'
  }, {
    name: 'Yusuf Ali',
    vehicle: 'Kia Sportage',
    score: 38,
    last: '2d'
  }],
  contacted: [{
    name: 'Fatima Noor',
    vehicle: 'Lexus RX 350',
    score: 52,
    last: '1d'
  }, {
    name: 'Layla Hassan',
    vehicle: 'Honda Civic',
    score: 33,
    last: '3d'
  }],
  interested: [{
    name: 'Omar Farooq',
    vehicle: 'BMW 320i',
    score: 64,
    last: '1d'
  }],
  testdrive: [{
    name: 'Sara Malik',
    vehicle: 'Tesla Model 3',
    score: 78,
    last: '5h'
  }],
  negotiation: [{
    name: 'Ahmed Khan',
    vehicle: 'Toyota Corolla',
    score: 86,
    last: '2h'
  }],
  booked: [{
    name: 'Mariam Said',
    vehicle: 'Mercedes C200',
    score: 91,
    last: '4h'
  }],
  sold: [{
    name: 'Daniel Park',
    vehicle: 'Audi Q5',
    score: 95,
    last: '1d'
  }]
};
const ACTIVITIES = [{
  who: 'Ahmed Khan',
  action: 'replied on WhatsApp',
  time: '12 min ago',
  icon: 'message-circle',
  tone: '#059669'
}, {
  who: 'Sara Malik',
  action: 'booked a test drive',
  time: '1h ago',
  icon: 'calendar-check',
  tone: '#2563EB'
}, {
  who: 'You',
  action: 'added Tesla Model 3 to inventory',
  time: '3h ago',
  icon: 'plus-circle',
  tone: '#7C3AED'
}, {
  who: 'Omar Farooq',
  action: 'viewed BMW 320i listing',
  time: '5h ago',
  icon: 'eye',
  tone: '#64748B'
}];
const FUNNEL = [{
  label: 'New Leads',
  value: 320,
  pct: 100
}, {
  label: 'Contacted',
  value: 238,
  pct: 74
}, {
  label: 'Interested',
  value: 156,
  pct: 49
}, {
  label: 'Test Drive',
  value: 92,
  pct: 29
}, {
  label: 'Booked',
  value: 48,
  pct: 15
}];
const SALES_SERIES = [32, 41, 38, 52, 47, 61, 58, 72, 68, 81, 76, 94];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
Object.assign(window, {
  VEHICLES,
  LEADS,
  PIPELINE,
  PIPELINE_CARDS,
  ACTIVITIES,
  FUNNEL,
  SALES_SERIES,
  MONTHS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/crm-web/data.jsx", error: String((e && e.message) || e) }); }

// ui_kits/crm-web/extras.jsx
try { (() => {
// Finance calculator, WhatsApp automation, Reports.
(function () {
  const DS = window.AutoPilotCRMDesignSystem_9860d1;
  function Finance() {
    const {
      Button
    } = DS;
    const {
      SectionCard
    } = window;
    const [price, setPrice] = React.useState(132000);
    const [down, setDown] = React.useState(20);
    const [rate, setRate] = React.useState(4.5);
    const [months, setMonths] = React.useState(48);
    const principal = price * (1 - down / 100);
    const r = rate / 100 / 12;
    const monthly = r > 0 ? principal * r / (1 - Math.pow(1 + r, -months)) : principal / months;
    const total = monthly * months + price * (down / 100);
    const fmt = n => 'AED ' + Math.round(n).toLocaleString();
    const Slider = ({
      label,
      value,
      set,
      min,
      max,
      step,
      suffix
    }) => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        color: 'var(--text-body)'
      }
    }, label), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: 800,
        color: 'var(--navy-900)',
        fontFamily: 'var(--font-display)'
      }
    }, suffix === 'AED' ? fmt(value) : value + (suffix || ''))), /*#__PURE__*/React.createElement("input", {
      type: "range",
      min: min,
      max: max,
      step: step,
      value: value,
      onChange: e => set(+e.target.value),
      style: {
        width: '100%',
        accentColor: '#059669'
      }
    }));
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 18,
        maxWidth: 900
      }
    }, /*#__PURE__*/React.createElement(SectionCard, {
      title: "Vehicle Financing"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 22
      }
    }, /*#__PURE__*/React.createElement(Slider, {
      label: "Vehicle price",
      value: price,
      set: setPrice,
      min: 40000,
      max: 300000,
      step: 1000,
      suffix: "AED"
    }), /*#__PURE__*/React.createElement(Slider, {
      label: "Down payment",
      value: down,
      set: setDown,
      min: 0,
      max: 50,
      step: 5,
      suffix: "%"
    }), /*#__PURE__*/React.createElement(Slider, {
      label: "Interest rate (APR)",
      value: rate,
      set: setRate,
      min: 0,
      max: 12,
      step: 0.25,
      suffix: "%"
    }), /*#__PURE__*/React.createElement(Slider, {
      label: "Duration",
      value: months,
      set: setMonths,
      min: 12,
      max: 72,
      step: 12,
      suffix: " mo"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 18
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'var(--gradient-navy)',
        color: '#fff',
        borderRadius: 'var(--radius-lg)',
        padding: 24
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 600,
        opacity: 0.7,
        textTransform: 'uppercase',
        letterSpacing: '0.06em'
      }
    }, "Monthly installment"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 40,
        fontWeight: 800,
        letterSpacing: '-0.02em',
        fontFamily: 'var(--font-display)',
        margin: '6px 0 16px'
      }
    }, fmt(monthly)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        fontSize: 13
      }
    }, [['Financed amount', fmt(principal)], ['Down payment', fmt(price * down / 100)], ['Total payable', fmt(total)]].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
      key: k,
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: 10,
        borderTop: '1px solid rgba(255,255,255,0.12)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        opacity: 0.7
      }
    }, k), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700
      }
    }, v))))), /*#__PURE__*/React.createElement(Button, {
      variant: "accent",
      size: "lg",
      fullWidth: true,
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "printer",
        size: 16
      })
    }, "Generate printable plan")));
  }
  function WhatsApp() {
    const {
      SectionCard
    } = window;
    const flow = [{
      type: 'trigger',
      icon: 'zap',
      title: 'New Lead',
      sub: 'Lead created from any source',
      tone: '#7C3AED'
    }, {
      type: 'action',
      icon: 'message-circle',
      title: 'Send WhatsApp',
      sub: '"Hi {name}, thanks for your interest in {vehicle}…"',
      tone: '#059669'
    }, {
      type: 'delay',
      icon: 'clock',
      title: 'Wait 24 hours',
      sub: 'If no response',
      tone: '#64748B'
    }, {
      type: 'action',
      icon: 'bell',
      title: 'Notify Salesperson',
      sub: 'Assign + create follow-up task',
      tone: '#2563EB'
    }];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 300px',
        gap: 18
      }
    }, /*#__PURE__*/React.createElement(SectionCard, {
      title: "Automation: New Lead \u2192 Follow-up",
      action: /*#__PURE__*/React.createElement(DS.Badge, {
        tone: "emerald",
        dot: true
      }, "Active")
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0,
        padding: '8px 0'
      }
    }, flow.map((s, i) => /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: '100%',
        maxWidth: 460,
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: 16,
        background: '#fff',
        border: '1px solid var(--border-soft)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-sm)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 42,
        height: 42,
        borderRadius: 11,
        background: s.tone + '16',
        color: s.tone,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: s.icon,
      size: 20
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: s.tone
      }
    }, s.type), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: 'var(--text-strong)'
      }
    }, s.title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: 'var(--text-muted)'
      }
    }, s.sub))), i < flow.length - 1 && /*#__PURE__*/React.createElement("div", {
      style: {
        width: 2,
        height: 26,
        background: 'var(--border-strong)'
      }
    }))))), /*#__PURE__*/React.createElement(SectionCard, {
      title: "Triggers & Actions"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }
    }, [['zap', 'New Lead'], ['message-circle-off', 'No Response'], ['calendar-check', 'Test Drive Scheduled'], ['clock', 'Follow-Up Due']].map(([ic, t]) => /*#__PURE__*/React.createElement("div", {
      key: t,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '10px 12px',
        border: '1px dashed var(--border-strong)',
        borderRadius: 'var(--radius-md)',
        fontSize: 13,
        fontWeight: 600,
        color: 'var(--text-body)',
        cursor: 'grab'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: ic,
      size: 16,
      color: "var(--slate-500)"
    }), " ", t)))));
  }
  function Reports() {
    const {
      StatCard,
      ProgressRing,
      AiInsight
    } = DS;
    const {
      SectionCard
    } = window;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 18
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4,1fr)',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(StatCard, {
      label: "Revenue (YTD)",
      value: "AED 48.6M",
      delta: "22%",
      trend: "up",
      accent: "emerald",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "trending-up",
        size: 18
      })
    }), /*#__PURE__*/React.createElement(StatCard, {
      label: "Units Sold (YTD)",
      value: "682",
      delta: "14%",
      trend: "up",
      accent: "navy",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "car-front",
        size: 18
      })
    }), /*#__PURE__*/React.createElement(StatCard, {
      label: "Avg. Days to Sell",
      value: "18",
      delta: "3 days",
      trend: "up",
      accent: "blue",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "calendar",
        size: 18
      })
    }), /*#__PURE__*/React.createElement(StatCard, {
      label: "Lead \u2192 Sale",
      value: "9.4%",
      delta: "0.8%",
      trend: "up",
      accent: "violet",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "filter",
        size: 18
      })
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1.6fr 1fr',
        gap: 18
      }
    }, /*#__PURE__*/React.createElement(SectionCard, {
      title: "Monthly Growth"
    }, /*#__PURE__*/React.createElement(AreaChart, null), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 6
      }
    }, window.MONTHS.map(m => /*#__PURE__*/React.createElement("span", {
      key: m,
      style: {
        fontSize: 10,
        color: 'var(--text-subtle)',
        fontWeight: 600
      }
    }, m)))), /*#__PURE__*/React.createElement(SectionCard, {
      title: "AI Forecast \u2014 Next Month"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement(ProgressRing, {
      value: 71,
      size: 120,
      label: "64",
      sublabel: "Units"
    }), /*#__PURE__*/React.createElement(AiInsight, {
      tone: "opportunity",
      meta: "forecast"
    }, "Projected ", /*#__PURE__*/React.createElement("strong", null, "64 units"), " next month (+8%) driven by EV demand. Stock 3 more electric vehicles to capture it.")))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 18
      }
    }, /*#__PURE__*/React.createElement(SectionCard, {
      title: "Lead Sources"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 12
      }
    }, [['WhatsApp', 42, '#059669'], ['Website', 28, '#2563EB'], ['Instagram', 18, '#7C3AED'], ['Referral', 12, '#D97706']].map(([s, p, c]) => /*#__PURE__*/React.createElement("div", {
      key: s,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 80,
        fontSize: 13,
        fontWeight: 600,
        color: 'var(--text-body)'
      }
    }, s), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        height: 10,
        background: 'var(--slate-100)',
        borderRadius: 6
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: p + '%',
        height: '100%',
        background: c,
        borderRadius: 6
      }
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        width: 36,
        textAlign: 'right',
        fontSize: 13,
        fontWeight: 700,
        color: 'var(--text-strong)'
      }
    }, p, "%"))))), /*#__PURE__*/React.createElement(SectionCard, {
      title: "Salesperson Performance"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 12
      }
    }, [['Rashid M.', 'AED 1.8M', 92], ['Aisha K.', 'AED 1.4M', 81], ['Omar S.', 'AED 1.1M', 74], ['Lena T.', 'AED 0.9M', 63]].map(([n, rev, sc]) => /*#__PURE__*/React.createElement("div", {
      key: n,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(DS.Avatar, {
      name: n,
      size: 34
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: 'var(--text-strong)'
      }
    }, n), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: 'var(--text-muted)'
      }
    }, rev)), /*#__PURE__*/React.createElement(DS.Badge, {
      tone: "emerald"
    }, sc)))))));
  }
  Object.assign(window, {
    Finance,
    WhatsApp,
    Reports
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/crm-web/extras.jsx", error: String((e && e.message) || e) }); }

// ui_kits/crm-web/icon.jsx
try { (() => {
// Shared Lucide icon helper for AutoPilot CRM kits.
// Loads real Lucide icons (no hand-drawn SVG). Requires the lucide UMD script.
function Icon({
  name,
  size = 18,
  strokeWidth = 2,
  color,
  style = {}
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const host = ref.current;
    if (!host) return;
    host.innerHTML = '<i data-lucide="' + name + '"></i>';
    if (window.lucide) window.lucide.createIcons();
    const svg = host.querySelector('svg');
    if (svg) {
      svg.setAttribute('width', size);
      svg.setAttribute('height', size);
      svg.style.strokeWidth = strokeWidth;
      svg.style.display = 'block';
    }
  }, [name, size, strokeWidth]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      display: 'inline-flex',
      color: color || 'currentColor',
      ...style
    }
  });
}
window.Icon = Icon;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/crm-web/icon.jsx", error: String((e && e.message) || e) }); }

// ui_kits/crm-web/inventory.jsx
try { (() => {
// Inventory screen.
(function () {
  const DS = window.AutoPilotCRMDesignSystem_9860d1;
  function Inventory() {
    const {
      Select,
      Button,
      Badge,
      IconButton
    } = DS;
    const {
      SectionCard
    } = window;
    const [q, setQ] = React.useState('');
    const rows = window.VEHICLES.filter(v => (v.make + ' ' + v.model).toLowerCase().includes(q.toLowerCase()));
    const cols = ['Vehicle', 'Year', 'Mileage', 'Fuel', 'Transmission', 'Price', 'Status', ''];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 10,
        alignItems: 'flex-end',
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 220,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        height: 44,
        padding: '0 14px',
        background: '#fff',
        border: '1px solid var(--border-strong)',
        borderRadius: 'var(--radius-md)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 16,
      color: "var(--slate-400)"
    }), /*#__PURE__*/React.createElement("input", {
      value: q,
      onChange: e => setQ(e.target.value),
      placeholder: "Search make, model, VIN\u2026",
      style: {
        border: 'none',
        outline: 'none',
        width: '100%',
        fontSize: 14,
        fontFamily: 'var(--font-body)'
      }
    })), /*#__PURE__*/React.createElement(Select, {
      options: ['All makes', 'Toyota', 'Nissan', 'BMW', 'Tesla'],
      containerStyle: {
        width: 130
      }
    }), /*#__PURE__*/React.createElement(Select, {
      options: ['Any year', '2023', '2022', '2021', '2020'],
      containerStyle: {
        width: 120
      }
    }), /*#__PURE__*/React.createElement(Select, {
      options: ['Any price', 'Under 75K', '75K–150K', '150K+'],
      containerStyle: {
        width: 130
      }
    }), /*#__PURE__*/React.createElement(Select, {
      options: ['All status', 'Available', 'Reserved', 'Sold'],
      containerStyle: {
        width: 130
      }
    }), /*#__PURE__*/React.createElement(Button, {
      variant: "accent",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "plus",
        size: 16
      })
    }, "Add Vehicle")), /*#__PURE__*/React.createElement(SectionCard, {
      pad: 0,
      style: {
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("table", {
      style: {
        width: '100%',
        borderCollapse: 'collapse'
      }
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
      style: {
        background: 'var(--slate-50)'
      }
    }, cols.map((c, i) => /*#__PURE__*/React.createElement("th", {
      key: i,
      style: {
        textAlign: i >= 1 && i <= 6 ? 'left' : 'left',
        padding: '13px 18px',
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
        borderBottom: '1px solid var(--divider)'
      }
    }, c)))), /*#__PURE__*/React.createElement("tbody", null, rows.map(v => /*#__PURE__*/React.createElement("tr", {
      key: v.id,
      style: {
        borderBottom: '1px solid var(--divider)'
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '12px 18px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(VehicleThumb, {
      color: v.color,
      size: 48
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: 'var(--text-strong)',
        display: 'flex',
        alignItems: 'center',
        gap: 7
      }
    }, v.make, " ", v.model, v.hot && /*#__PURE__*/React.createElement(Badge, {
      tone: "red",
      size: "sm",
      dot: true
    }, "Hot")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: 'var(--text-subtle)',
        fontFamily: 'var(--font-mono)'
      }
    }, "VIN \xB7\xB7\xB7\xB7", 1000 + v.id)))), /*#__PURE__*/React.createElement("td", {
      style: cellStyle
    }, v.year), /*#__PURE__*/React.createElement("td", {
      style: cellStyle
    }, v.mileage), /*#__PURE__*/React.createElement("td", {
      style: cellStyle
    }, v.fuel), /*#__PURE__*/React.createElement("td", {
      style: cellStyle
    }, v.trans), /*#__PURE__*/React.createElement("td", {
      style: {
        ...cellStyle,
        fontWeight: 700,
        color: 'var(--text-strong)',
        fontFamily: 'var(--font-display)'
      }
    }, v.price), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '12px 18px'
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      tone: v.tone,
      dot: true
    }, v.status)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '12px 18px',
        textAlign: 'right'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'inline-flex',
        gap: 4
      }
    }, /*#__PURE__*/React.createElement(IconButton, {
      variant: "ghost",
      size: "sm",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "sparkles",
        size: 15,
        color: "var(--emerald-600)"
      }),
      "aria-label": "Generate description"
    }), /*#__PURE__*/React.createElement(IconButton, {
      variant: "ghost",
      size: "sm",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "pencil",
        size: 15
      }),
      "aria-label": "Edit"
    }), /*#__PURE__*/React.createElement(IconButton, {
      variant: "ghost",
      size: "sm",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "more-horizontal",
        size: 15
      }),
      "aria-label": "More"
    })))))))));
  }
  const cellStyle = {
    padding: '12px 18px',
    fontSize: 13,
    color: 'var(--text-body)'
  };
  window.Inventory = Inventory;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/crm-web/inventory.jsx", error: String((e && e.message) || e) }); }

// ui_kits/crm-web/leads.jsx
try { (() => {
// Leads screen.
(function () {
  const DS = window.AutoPilotCRMDesignSystem_9860d1;
  function Leads() {
    const {
      Tabs,
      Badge,
      Button,
      IconButton,
      Avatar,
      LeadScore
    } = DS;
    const {
      SectionCard
    } = window;
    const [tab, setTab] = React.useState('all');
    const filtered = window.LEADS.filter(l => {
      if (tab === 'hot') return l.score >= 70;
      if (tab === 'warm') return l.score >= 40 && l.score < 70;
      if (tab === 'cold') return l.score < 40;
      return true;
    });
    const statusTone = {
      'New Lead': 'slate',
      Contacted: 'blue',
      Interested: 'navy',
      'Test Drive': 'violet',
      Negotiation: 'amber',
      Booked: 'emerald'
    };
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(Tabs, {
      value: tab,
      onChange: setTab,
      tabs: [{
        value: 'all',
        label: 'All',
        count: 128
      }, {
        value: 'hot',
        label: 'Hot',
        count: 14
      }, {
        value: 'warm',
        label: 'Warm',
        count: 46
      }, {
        value: 'cold',
        label: 'Cold',
        count: 68
      }],
      style: {
        flex: 1
      }
    }), /*#__PURE__*/React.createElement(Button, {
      variant: "accent",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "user-plus",
        size: 16
      })
    }, "Add Lead")), /*#__PURE__*/React.createElement(SectionCard, {
      pad: 0,
      style: {
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("table", {
      style: {
        width: '100%',
        borderCollapse: 'collapse'
      }
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
      style: {
        background: 'var(--slate-50)'
      }
    }, ['Customer', 'Interested Vehicle', 'Source', 'AI Lead Score', 'Status', 'Last Contact', ''].map((c, i) => /*#__PURE__*/React.createElement("th", {
      key: i,
      style: {
        textAlign: 'left',
        padding: '13px 18px',
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
        borderBottom: '1px solid var(--divider)'
      }
    }, c)))), /*#__PURE__*/React.createElement("tbody", null, filtered.map(l => /*#__PURE__*/React.createElement("tr", {
      key: l.id,
      style: {
        borderBottom: '1px solid var(--divider)'
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '12px 18px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: l.name,
      size: 40
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: 'var(--text-strong)'
      }
    }, l.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: 'var(--text-subtle)',
        fontFamily: 'var(--font-mono)'
      }
    }, l.phone)))), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '12px 18px',
        fontSize: 13,
        color: 'var(--text-body)'
      }
    }, l.vehicle), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '12px 18px'
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      tone: "slate",
      size: "sm"
    }, l.source)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '12px 18px'
      }
    }, /*#__PURE__*/React.createElement(LeadScore, {
      score: l.score
    })), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '12px 18px'
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      tone: statusTone[l.status] || 'slate',
      dot: true
    }, l.status)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '12px 18px',
        fontSize: 12,
        color: 'var(--text-muted)'
      }
    }, l.last), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '12px 18px',
        textAlign: 'right'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'inline-flex',
        gap: 4
      }
    }, /*#__PURE__*/React.createElement(IconButton, {
      variant: "ghost",
      size: "sm",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "message-circle",
        size: 15,
        color: "var(--emerald-600)"
      }),
      "aria-label": "WhatsApp"
    }), /*#__PURE__*/React.createElement(IconButton, {
      variant: "ghost",
      size: "sm",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "phone",
        size: 15
      }),
      "aria-label": "Call"
    }), /*#__PURE__*/React.createElement(IconButton, {
      variant: "ghost",
      size: "sm",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "chevron-right",
        size: 15
      }),
      "aria-label": "Open"
    })))))))));
  }
  window.Leads = Leads;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/crm-web/leads.jsx", error: String((e && e.message) || e) }); }

// ui_kits/crm-web/pipeline.jsx
try { (() => {
// Kanban pipeline screen.
(function () {
  const DS = window.AutoPilotCRMDesignSystem_9860d1;
  function Pipeline() {
    const {
      LeadScore
    } = DS;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 14,
        overflowX: 'auto',
        paddingBottom: 8,
        alignItems: 'flex-start'
      }
    }, window.PIPELINE.map(col => {
      const cards = window.PIPELINE_CARDS[col.key] || [];
      return /*#__PURE__*/React.createElement("div", {
        key: col.key,
        style: {
          width: 252,
          flexShrink: 0,
          background: 'var(--slate-50)',
          border: '1px solid var(--border-soft)',
          borderRadius: 'var(--radius-lg)',
          padding: 10
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '6px 8px 12px'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          width: 9,
          height: 9,
          borderRadius: '50%',
          background: col.tone
        }
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 13,
          fontWeight: 700,
          color: 'var(--text-strong)',
          fontFamily: 'var(--font-display)'
        }
      }, col.title), /*#__PURE__*/React.createElement("span", {
        style: {
          marginLeft: 'auto',
          fontSize: 12,
          fontWeight: 700,
          color: 'var(--text-muted)',
          background: '#fff',
          border: '1px solid var(--border-soft)',
          borderRadius: 999,
          padding: '1px 8px'
        }
      }, cards.length)), /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          flexDirection: 'column',
          gap: 8
        }
      }, cards.map((c, i) => /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          background: '#fff',
          border: '1px solid var(--border-soft)',
          borderRadius: 'var(--radius-md)',
          padding: 12,
          boxShadow: 'var(--shadow-xs)',
          cursor: 'grab'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 9,
          marginBottom: 8
        }
      }, /*#__PURE__*/React.createElement(DS.Avatar, {
        name: c.name,
        size: 28
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 13,
          fontWeight: 700,
          color: 'var(--text-strong)'
        }
      }, c.name)), /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 12,
          color: 'var(--text-muted)',
          marginBottom: 10
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "car-front",
        size: 13
      }), " ", c.vehicle), /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }
      }, /*#__PURE__*/React.createElement(LeadScore, {
        score: c.score,
        showBar: false,
        size: "sm"
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 11,
          color: 'var(--text-subtle)',
          display: 'flex',
          alignItems: 'center',
          gap: 4
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "clock",
        size: 12
      }), " ", c.last)))), /*#__PURE__*/React.createElement("button", {
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          padding: '9px',
          border: '1px dashed var(--border-strong)',
          background: 'transparent',
          borderRadius: 'var(--radius-md)',
          color: 'var(--text-muted)',
          fontSize: 12,
          fontWeight: 600,
          cursor: 'pointer',
          fontFamily: 'var(--font-display)'
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "plus",
        size: 14
      }), " Add lead")));
    }));
  }
  window.Pipeline = Pipeline;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/crm-web/pipeline.jsx", error: String((e && e.message) || e) }); }

// ui_kits/crm-web/shell.jsx
try { (() => {
// App shell: sidebar + topbar.
const NAV = [{
  key: 'dashboard',
  label: 'Dashboard',
  icon: 'layout-dashboard'
}, {
  key: 'inventory',
  label: 'Inventory',
  icon: 'car-front'
}, {
  key: 'leads',
  label: 'Leads',
  icon: 'users'
}, {
  key: 'pipeline',
  label: 'Pipeline',
  icon: 'kanban'
}, {
  key: 'assistant',
  label: 'AI Assistant',
  icon: 'sparkles',
  accent: true
}];
const NAV2 = [{
  key: 'whatsapp',
  label: 'WhatsApp',
  icon: 'message-circle'
}, {
  key: 'finance',
  label: 'Finance',
  icon: 'calculator'
}, {
  key: 'reports',
  label: 'Reports',
  icon: 'bar-chart-3'
}];
function Sidebar({
  active,
  onNav
}) {
  const Item = ({
    item
  }) => {
    const on = active === item.key;
    const [hover, setHover] = React.useState(false);
    return /*#__PURE__*/React.createElement("button", {
      onClick: () => onNav(item.key),
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        width: '100%',
        padding: '10px 12px',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'left',
        borderRadius: 'var(--radius-md)',
        marginBottom: 2,
        font: 'var(--weight-semibold) 14px/1 var(--font-display)',
        background: on ? 'rgba(255,255,255,0.10)' : hover ? 'rgba(255,255,255,0.05)' : 'transparent',
        color: on ? '#fff' : 'rgba(226,236,245,0.72)',
        position: 'relative',
        transition: 'all var(--dur-fast)'
      }
    }, on && /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: -16,
        top: 8,
        bottom: 8,
        width: 3,
        borderRadius: 3,
        background: 'var(--emerald-400)'
      }
    }), /*#__PURE__*/React.createElement(Icon, {
      name: item.icon,
      size: 18,
      color: item.accent ? 'var(--emerald-400)' : on ? '#fff' : 'rgba(226,236,245,0.72)'
    }), item.label, item.accent && /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: 'auto',
        fontSize: 9,
        fontWeight: 800,
        letterSpacing: '0.06em',
        color: 'var(--emerald-300)',
        background: 'rgba(16,185,129,0.16)',
        padding: '3px 6px',
        borderRadius: 6
      }
    }, "AI"));
  };
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 248,
      flexShrink: 0,
      background: 'var(--gradient-navy)',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px 16px',
      boxSizing: 'border-box',
      height: '100%',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '0 8px 22px'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-white.svg",
    alt: "AutoPilot CRM",
    style: {
      height: 30
    }
  })), /*#__PURE__*/React.createElement("nav", null, NAV.map(i => /*#__PURE__*/React.createElement(Item, {
    key: i.key,
    item: i
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: 'rgba(255,255,255,0.08)',
      margin: '16px 8px'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      padding: '0 12px 8px',
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'rgba(226,236,245,0.4)'
    }
  }, "Automation"), /*#__PURE__*/React.createElement("nav", null, NAV2.map(i => /*#__PURE__*/React.createElement(Item, {
    key: i.key,
    item: i
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(16,185,129,0.12)',
      border: '1px solid rgba(16,185,129,0.25)',
      borderRadius: 'var(--radius-md)',
      padding: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "zap",
    size: 15,
    color: "var(--emerald-400)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 700
    }
  }, "AI Sales Score")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 28,
      fontWeight: 800,
      letterSpacing: '-0.02em',
      fontFamily: 'var(--font-display)'
    }
  }, "82", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      opacity: 0.6
    }
  }, "/100")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'rgba(226,236,245,0.6)'
    }
  }, "Dealership health \xB7 this month"))));
}
function Topbar({
  title,
  subtitle
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      height: 68,
      flexShrink: 0,
      background: 'var(--white)',
      borderBottom: '1px solid var(--border-soft)',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '0 28px'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: 'var(--weight-bold) 20px/1.1 var(--font-display)',
      letterSpacing: '-0.01em',
      color: 'var(--text-strong)'
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, subtitle)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      height: 40,
      padding: '0 14px',
      background: 'var(--slate-50)',
      border: '1px solid var(--border-soft)',
      borderRadius: 'var(--radius-pill)',
      width: 240
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 16,
    color: "var(--slate-400)"
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "Search\u2026",
    style: {
      border: 'none',
      background: 'none',
      outline: 'none',
      fontSize: 13,
      fontFamily: 'var(--font-body)',
      width: '100%'
    }
  })), /*#__PURE__*/React.createElement("button", {
    style: {
      position: 'relative',
      width: 40,
      height: 40,
      borderRadius: '50%',
      border: '1px solid var(--border-soft)',
      background: 'var(--white)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bell",
    size: 18,
    color: "var(--slate-600)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 8,
      right: 9,
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: 'var(--red-500)',
      border: '2px solid #fff'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      paddingLeft: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 38,
      height: 38,
      borderRadius: '50%',
      background: 'var(--gradient-emerald)',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 700,
      fontSize: 14,
      fontFamily: 'var(--font-display)'
    }
  }, "RM"), /*#__PURE__*/React.createElement("div", {
    style: {
      lineHeight: 1.2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--text-strong)'
    }
  }, "Rashid M."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--text-muted)'
    }
  }, "Sales Manager")))));
}
Object.assign(window, {
  Sidebar,
  Topbar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/crm-web/shell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/landing.jsx
try { (() => {
// AutoPilot CRM marketing landing page.
(function () {
  const DS = window.AutoPilotCRMDesignSystem_9860d1;
  const {
    Button,
    Badge,
    Card,
    AiInsight
  } = DS;
  const Wrap = ({
    children,
    style = {}
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: '0 auto',
      padding: '0 28px',
      ...style
    }
  }, children);
  const Eyebrow = ({
    children
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      padding: '6px 12px',
      borderRadius: 999,
      background: 'var(--emerald-50)',
      border: '1px solid var(--emerald-100)',
      color: 'var(--emerald-700)',
      fontSize: 12.5,
      fontWeight: 700,
      fontFamily: 'var(--font-display)',
      letterSpacing: '0.01em'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkles",
    size: 14
  }), " ", children);
  function Nav() {
    return /*#__PURE__*/React.createElement("header", {
      style: {
        position: 'sticky',
        top: 0,
        zIndex: 20,
        background: 'rgba(255,255,255,0.82)',
        backdropFilter: 'var(--blur-glass)',
        WebkitBackdropFilter: 'var(--blur-glass)',
        borderBottom: '1px solid var(--border-soft)'
      }
    }, /*#__PURE__*/React.createElement(Wrap, {
      style: {
        display: 'flex',
        alignItems: 'center',
        height: 70,
        gap: 28
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/logo.svg",
      alt: "AutoPilot CRM",
      style: {
        height: 30
      }
    }), /*#__PURE__*/React.createElement("nav", {
      style: {
        display: 'flex',
        gap: 26,
        marginLeft: 18
      }
    }, ['Features', 'AI Assistant', 'Pricing', 'FAQ'].map(l => /*#__PURE__*/React.createElement("a", {
      key: l,
      href: "#",
      style: {
        fontSize: 14,
        fontWeight: 600,
        color: 'var(--text-body)',
        textDecoration: 'none'
      }
    }, l))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginLeft: 'auto',
        display: 'flex',
        gap: 10,
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost"
    }, "Sign in"), /*#__PURE__*/React.createElement(Button, {
      variant: "accent",
      iconRight: /*#__PURE__*/React.createElement(Icon, {
        name: "arrow-right",
        size: 15
      })
    }, "Start free trial"))));
  }
  function Hero() {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--white)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        background: 'var(--gradient-mesh)'
      }
    }), /*#__PURE__*/React.createElement(Wrap, {
      style: {
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: '1.05fr 0.95fr',
        gap: 48,
        alignItems: 'center',
        padding: '76px 28px 88px'
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "The first AI car-dealer CRM"), /*#__PURE__*/React.createElement("h1", {
      style: {
        font: '800 60px/1.04 var(--font-display)',
        letterSpacing: '-0.03em',
        color: 'var(--navy-900)',
        margin: '20px 0 0',
        textWrap: 'balance'
      }
    }, "Sell more cars.", /*#__PURE__*/React.createElement("br", null), "Close more deals.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
      style: {
        background: 'var(--gradient-emerald)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent'
      }
    }, "Automatically.")), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 18,
        lineHeight: 1.6,
        color: 'var(--text-muted)',
        maxWidth: 460,
        margin: '22px 0 30px'
      }
    }, "Not just a CRM \u2014 an AI-powered sales operating system for car dealerships. Score leads, automate WhatsApp follow-ups, and let AI tell you exactly who to call next."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 12,
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "accent",
      size: "lg",
      iconRight: /*#__PURE__*/React.createElement(Icon, {
        name: "arrow-right",
        size: 16
      })
    }, "Start free trial"), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "lg",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "play",
        size: 15
      })
    }, "Watch demo")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 22,
        marginTop: 30,
        fontSize: 13,
        color: 'var(--text-muted)',
        fontWeight: 600
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 15,
      color: "var(--emerald-600)"
    }), " No credit card"), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 15,
      color: "var(--emerald-600)"
    }), " 14-day trial"), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 15,
      color: "var(--emerald-600)"
    }), " Setup in minutes"))), /*#__PURE__*/React.createElement(HeroPanel, null)));
  }
  function HeroPanel() {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'var(--gradient-navy)',
        borderRadius: 'var(--radius-2xl)',
        padding: 22,
        boxShadow: 'var(--shadow-xl)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: '#fff',
        fontSize: 13,
        fontWeight: 700,
        fontFamily: 'var(--font-display)',
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "layout-dashboard",
      size: 16,
      color: "var(--emerald-400)"
    }), " Dealership Overview"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--emerald-300)',
        fontSize: 12,
        fontWeight: 700
      }
    }, "Live")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 10,
        marginBottom: 12
      }
    }, [['Vehicles Sold', '38', '+12%'], ['Revenue', 'AED 4.2M', '+8%']].map(([l, v, d]) => /*#__PURE__*/React.createElement("div", {
      key: l,
      style: {
        background: 'rgba(255,255,255,0.07)',
        borderRadius: 14,
        padding: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: 'rgba(226,236,245,0.6)',
        fontWeight: 600
      }
    }, l), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 24,
        fontWeight: 800,
        color: '#fff',
        fontFamily: 'var(--font-display)',
        letterSpacing: '-0.02em',
        margin: '2px 0'
      }
    }, v), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: 'var(--emerald-300)',
        fontWeight: 700
      }
    }, d, " this month")))), /*#__PURE__*/React.createElement("div", {
      style: {
        background: '#fff',
        borderRadius: 14,
        padding: 14
      }
    }, /*#__PURE__*/React.createElement(AiInsight, {
      tone: "opportunity",
      meta: "now"
    }, "Follow up with ", /*#__PURE__*/React.createElement("strong", null, "Ahmed Khan"), " \u2014 closing probability ", /*#__PURE__*/React.createElement("strong", null, "82%"), "."))), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        bottom: -20,
        left: -24,
        background: '#fff',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg)',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        border: '1px solid var(--border-soft)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 36,
        height: 36,
        borderRadius: 10,
        background: 'var(--emerald-50)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "trending-up",
      size: 18,
      color: "var(--emerald-600)"
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 18,
        fontWeight: 800,
        color: 'var(--navy-900)',
        fontFamily: 'var(--font-display)'
      }
    }, "+34%"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: 'var(--text-muted)',
        fontWeight: 600
      }
    }, "conversion uplift"))));
  }
  function Trust() {
    return /*#__PURE__*/React.createElement(Wrap, {
      style: {
        padding: '36px 28px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center',
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--text-subtle)',
        marginBottom: 20
      }
    }, "Trusted by 1,200+ dealerships across the region"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'center',
        gap: 48,
        flexWrap: 'wrap',
        opacity: 0.55
      }
    }, ['AutoHub', 'DriveMax', 'GulfMotors', 'PrimeAuto', 'VelocityCars'].map(n => /*#__PURE__*/React.createElement("span", {
      key: n,
      style: {
        fontSize: 22,
        fontWeight: 800,
        color: 'var(--navy-900)',
        fontFamily: 'var(--font-display)',
        letterSpacing: '-0.02em'
      }
    }, n))));
  }
  function Features() {
    const feats = [['brain', 'AI Lead Scoring', 'Every lead is scored Hot, Warm or Cold with a real closing-probability prediction — so your team always works the right deals first.'], ['message-circle', 'WhatsApp Automation', 'Trigger personalized WhatsApp follow-ups the moment a lead goes quiet. Built-in visual automation builder, no code.'], ['kanban', 'Visual Sales Pipeline', 'Drag deals from New Lead to Sold across a kanban board built for showroom workflows.'], ['car-front', 'Smart Inventory', 'Manage every vehicle with photos, specs and pricing. AI writes your listing descriptions in seconds.'], ['calculator', 'Finance Calculator', 'Generate printable financing plans with monthly installments while the customer is still in the showroom.'], ['bar-chart-3', 'AI Forecasting', 'Predict next month\u2019s sales, spot top-performing vehicles, and track every salesperson\u2019s numbers.']];
    return /*#__PURE__*/React.createElement("section", {
      style: {
        background: 'var(--slate-50)',
        padding: '80px 0'
      },
      id: "features"
    }, /*#__PURE__*/React.createElement(Wrap, null, /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center',
        marginBottom: 48
      }
    }, /*#__PURE__*/React.createElement(Eyebrow, null, "Everything you need to sell"), /*#__PURE__*/React.createElement("h2", {
      style: {
        font: '800 40px/1.1 var(--font-display)',
        letterSpacing: '-0.025em',
        color: 'var(--navy-900)',
        margin: '16px 0 0'
      }
    }, "One operating system for your dealership")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 18
      }
    }, feats.map(([ic, t, d]) => /*#__PURE__*/React.createElement(Card, {
      key: t,
      interactive: true
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        width: 48,
        height: 48,
        borderRadius: 13,
        background: 'var(--emerald-50)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: ic,
      size: 22,
      color: "var(--emerald-600)"
    })), /*#__PURE__*/React.createElement("h3", {
      style: {
        font: '700 19px/1.2 var(--font-display)',
        color: 'var(--navy-900)',
        margin: '0 0 8px'
      }
    }, t), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 14.5,
        lineHeight: 1.6,
        color: 'var(--text-muted)',
        margin: 0
      }
    }, d))))));
  }
  function AIDemo() {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        padding: '84px 0'
      },
      id: "ai"
    }, /*#__PURE__*/React.createElement(Wrap, {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 56,
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "Your AI sales copilot"), /*#__PURE__*/React.createElement("h2", {
      style: {
        font: '800 40px/1.1 var(--font-display)',
        letterSpacing: '-0.025em',
        color: 'var(--navy-900)',
        margin: '16px 0 18px'
      }
    }, "It tells you exactly who to call next"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 17,
        lineHeight: 1.65,
        color: 'var(--text-muted)',
        marginBottom: 24
      }
    }, "Ask anything about your dealership. AutoPilot summarizes customer history, drafts WhatsApp messages, predicts deal closure, and recommends your next best action \u2014 in plain language."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 14
      }
    }, [['Draft WhatsApp messages instantly', 'message-square-text'], ['Predict closing probability per lead', 'percent'], ['Summarize every customer interaction', 'file-text']].map(([t, ic]) => /*#__PURE__*/React.createElement("div", {
      key: t,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        fontSize: 15,
        fontWeight: 600,
        color: 'var(--text-body)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 30,
        height: 30,
        borderRadius: 9,
        background: 'var(--emerald-50)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: ic,
      size: 16,
      color: "var(--emerald-600)"
    })), t)))), /*#__PURE__*/React.createElement("div", {
      style: {
        background: '#fff',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border-soft)',
        boxShadow: 'var(--shadow-xl)',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '14px 18px',
        borderBottom: '1px solid var(--divider)',
        background: 'linear-gradient(180deg, rgba(16,185,129,0.05), transparent)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 32,
        height: 32,
        borderRadius: 9,
        background: 'var(--gradient-emerald)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "sparkles",
      size: 16
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 800,
        fontSize: 14,
        color: 'var(--navy-900)',
        fontFamily: 'var(--font-display)'
      }
    }, "AutoPilot Copilot")), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 18,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        background: 'var(--slate-50)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        alignSelf: 'flex-end',
        background: 'var(--navy-900)',
        color: '#fff',
        padding: '10px 14px',
        borderRadius: '12px 12px 4px 12px',
        fontSize: 13.5,
        maxWidth: '80%'
      }
    }, "What should I do next today?"), /*#__PURE__*/React.createElement("div", {
      style: {
        alignSelf: 'flex-start',
        background: '#fff',
        border: '1px solid var(--border-soft)',
        padding: '12px 14px',
        borderRadius: '12px 12px 12px 4px',
        fontSize: 13.5,
        lineHeight: 1.55,
        maxWidth: '88%',
        color: 'var(--text-body)'
      }
    }, "Call ", /*#__PURE__*/React.createElement("strong", null, "Ahmed Khan"), " first \u2014 82% close probability. Then send the WhatsApp draft I prepared to 12 uncontacted leads. Want me to send it now?")))));
  }
  function Testimonials() {
    const t = [['AutoPilot doubled our follow-up rate. The AI literally tells my team who to call — we close deals we used to lose.', 'Rashid Mahmoud', 'GM, DriveMax Motors'], ['The WhatsApp automation alone paid for itself in the first week. Our response time went from hours to seconds.', 'Aisha Karim', 'Sales Director, AutoHub'], ['Lead scoring is scarily accurate. We stopped wasting time on cold leads and revenue is up 34%.', 'Omar Saleh', 'Owner, PrimeAuto']];
    return /*#__PURE__*/React.createElement("section", {
      style: {
        background: 'var(--slate-50)',
        padding: '80px 0'
      }
    }, /*#__PURE__*/React.createElement(Wrap, null, /*#__PURE__*/React.createElement("h2", {
      style: {
        font: '800 38px/1.1 var(--font-display)',
        letterSpacing: '-0.025em',
        color: 'var(--navy-900)',
        textAlign: 'center',
        margin: '0 0 44px'
      }
    }, "Dealerships are closing more, faster"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3,1fr)',
        gap: 18
      }
    }, t.map(([quote, name, role]) => /*#__PURE__*/React.createElement(Card, {
      key: name
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 3,
        marginBottom: 14
      }
    }, [0, 1, 2, 3, 4].map(i => /*#__PURE__*/React.createElement(Icon, {
      key: i,
      name: "star",
      size: 16,
      color: "var(--amber-500)"
    }))), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 15,
        lineHeight: 1.6,
        color: 'var(--text-body)',
        margin: '0 0 18px',
        fontWeight: 500
      }
    }, "\"", quote, "\""), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 11
      }
    }, /*#__PURE__*/React.createElement(DS.Avatar, {
      name: name,
      size: 40
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: 'var(--navy-900)'
      }
    }, name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12.5,
        color: 'var(--text-muted)'
      }
    }, role))))))));
  }
  function Pricing() {
    const plans = [['Starter', 'AED 299', '/mo', 'For single showrooms', ['Up to 100 vehicles', 'Lead management', 'WhatsApp inbox', 'Basic reports'], false], ['Growth', 'AED 749', '/mo', 'For growing dealerships', ['Unlimited vehicles', 'AI lead scoring', 'WhatsApp automation', 'AI sales copilot', 'Finance calculator'], true], ['Enterprise', 'Custom', '', 'For dealership networks', ['Everything in Growth', 'Multi-branch', 'AI forecasting', 'Dedicated success manager'], false]];
    return /*#__PURE__*/React.createElement("section", {
      style: {
        padding: '84px 0'
      },
      id: "pricing"
    }, /*#__PURE__*/React.createElement(Wrap, null, /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center',
        marginBottom: 44
      }
    }, /*#__PURE__*/React.createElement(Eyebrow, null, "Simple pricing"), /*#__PURE__*/React.createElement("h2", {
      style: {
        font: '800 40px/1.1 var(--font-display)',
        letterSpacing: '-0.025em',
        color: 'var(--navy-900)',
        margin: '16px 0 0'
      }
    }, "Plans that scale with your lot")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3,1fr)',
        gap: 18,
        alignItems: 'start'
      }
    }, plans.map(([name, price, per, desc, feats, pop]) => /*#__PURE__*/React.createElement("div", {
      key: name,
      style: {
        position: 'relative',
        background: pop ? 'var(--gradient-navy)' : '#fff',
        color: pop ? '#fff' : 'inherit',
        border: pop ? 'none' : '1px solid var(--border-soft)',
        borderRadius: 'var(--radius-xl)',
        padding: 28,
        boxShadow: pop ? 'var(--shadow-xl)' : 'var(--shadow-card)',
        transform: pop ? 'translateY(-8px)' : 'none'
      }
    }, pop && /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        top: 18,
        right: 18,
        background: 'var(--gradient-emerald)',
        color: '#fff',
        fontSize: 11,
        fontWeight: 800,
        padding: '4px 10px',
        borderRadius: 999,
        letterSpacing: '0.04em'
      }
    }, "POPULAR"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 700,
        fontFamily: 'var(--font-display)',
        color: pop ? '#fff' : 'var(--navy-900)'
      }
    }, name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: pop ? 'rgba(226,236,245,0.7)' : 'var(--text-muted)',
        marginBottom: 16
      }
    }, desc), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'baseline',
        gap: 4,
        marginBottom: 20
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 38,
        fontWeight: 800,
        fontFamily: 'var(--font-display)',
        letterSpacing: '-0.02em',
        color: pop ? '#fff' : 'var(--navy-900)'
      }
    }, price), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        color: pop ? 'rgba(226,236,245,0.7)' : 'var(--text-muted)'
      }
    }, per)), /*#__PURE__*/React.createElement(Button, {
      variant: pop ? 'accent' : 'secondary',
      fullWidth: true,
      size: "lg"
    }, name === 'Enterprise' ? 'Contact sales' : 'Start free trial'), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 11,
        marginTop: 22
      }
    }, feats.map(f => /*#__PURE__*/React.createElement("div", {
      key: f,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 9,
        fontSize: 14,
        color: pop ? 'rgba(255,255,255,0.92)' : 'var(--text-body)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 16,
      color: pop ? 'var(--emerald-300)' : 'var(--emerald-600)'
    }), " ", f))))))));
  }
  function FAQ() {
    const qs = [['Is AutoPilot really powered by AI?', 'Yes. Lead scoring, message drafting, customer summaries and sales forecasting all use AI trained on dealership sales patterns — it learns from your own data over time.'], ['Does it integrate with WhatsApp?', 'Fully. Connect your WhatsApp Business number and automate follow-ups, send messages from any lead, and keep the full conversation history on each customer profile.'], ['How long does setup take?', 'Most dealerships are live within an afternoon. Import your inventory via spreadsheet and your team can start working leads the same day.'], ['Can I try it before paying?', 'Every plan includes a 14-day free trial with no credit card required.']];
    const [open, setOpen] = React.useState(0);
    return /*#__PURE__*/React.createElement("section", {
      style: {
        background: 'var(--slate-50)',
        padding: '80px 0'
      },
      id: "faq"
    }, /*#__PURE__*/React.createElement(Wrap, {
      style: {
        maxWidth: 780
      }
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        font: '800 38px/1.1 var(--font-display)',
        letterSpacing: '-0.025em',
        color: 'var(--navy-900)',
        textAlign: 'center',
        margin: '0 0 40px'
      }
    }, "Frequently asked questions"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 12
      }
    }, qs.map(([q, a], i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        background: '#fff',
        border: '1px solid var(--border-soft)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setOpen(open === i ? -1 : i),
      style: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '18px 20px',
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        textAlign: 'left',
        fontSize: 16,
        fontWeight: 700,
        color: 'var(--navy-900)',
        fontFamily: 'var(--font-display)'
      }
    }, q, /*#__PURE__*/React.createElement(Icon, {
      name: open === i ? 'minus' : 'plus',
      size: 18,
      color: "var(--emerald-600)"
    })), open === i && /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '0 20px 18px',
        fontSize: 14.5,
        lineHeight: 1.6,
        color: 'var(--text-muted)'
      }
    }, a))))));
  }
  function CTA() {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        padding: '88px 0'
      }
    }, /*#__PURE__*/React.createElement(Wrap, null, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--gradient-brand)',
        borderRadius: 'var(--radius-2xl)',
        padding: '64px 40px',
        textAlign: 'center',
        boxShadow: 'var(--shadow-xl)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        background: 'var(--gradient-mesh)',
        opacity: 0.6
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        font: '800 46px/1.08 var(--font-display)',
        letterSpacing: '-0.03em',
        color: '#fff',
        margin: '0 0 16px',
        textWrap: 'balance'
      }
    }, "The first AI car-dealer CRM that helps you close more deals automatically."), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 18,
        color: 'rgba(226,236,245,0.8)',
        maxWidth: 520,
        margin: '0 auto 28px'
      }
    }, "Join 1,200+ dealerships selling smarter with AutoPilot."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 12,
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "accent",
      size: "lg",
      iconRight: /*#__PURE__*/React.createElement(Icon, {
        name: "arrow-right",
        size: 16
      })
    }, "Start your free trial"), /*#__PURE__*/React.createElement(Button, {
      size: "lg",
      style: {
        background: 'rgba(255,255,255,0.12)',
        color: '#fff',
        border: '1px solid rgba(255,255,255,0.25)'
      }
    }, "Book a demo"))))));
  }
  function Footer() {
    return /*#__PURE__*/React.createElement("footer", {
      style: {
        borderTop: '1px solid var(--border-soft)',
        padding: '40px 0'
      }
    }, /*#__PURE__*/React.createElement(Wrap, {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/logo.svg",
      alt: "AutoPilot CRM",
      style: {
        height: 26
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: 'var(--text-muted)'
      }
    }, "\xA9 2026 AutoPilot CRM. Sell more cars, automatically."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 18
      }
    }, ['Privacy', 'Terms', 'Contact'].map(l => /*#__PURE__*/React.createElement("a", {
      key: l,
      href: "#",
      style: {
        fontSize: 13,
        color: 'var(--text-muted)',
        textDecoration: 'none',
        fontWeight: 600
      }
    }, l)))));
  }
  function Landing() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Nav, null), /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(Trust, null), /*#__PURE__*/React.createElement(Features, null), /*#__PURE__*/React.createElement(AIDemo, null), /*#__PURE__*/React.createElement(Testimonials, null), /*#__PURE__*/React.createElement(Pricing, null), /*#__PURE__*/React.createElement(FAQ, null), /*#__PURE__*/React.createElement(CTA, null), /*#__PURE__*/React.createElement(Footer, null));
  }
  if (window.lucide) window.lucide.createIcons();
  ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(Landing, null));
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/landing.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mobile/mobile.jsx
try { (() => {
// AutoPilot CRM mobile app — salesperson screens in phone frames.
(function () {
  const DS = window.AutoPilotCRMDesignSystem_9860d1;
  function Phone({
    label,
    children
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 320,
        height: 660,
        background: '#0A2540',
        borderRadius: 44,
        padding: 11,
        boxShadow: 'var(--shadow-xl)',
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: '100%',
        height: '100%',
        background: 'var(--slate-50)',
        borderRadius: 34,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: 44,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 22px',
        fontSize: 12,
        fontWeight: 700,
        color: 'var(--navy-900)',
        fontFamily: 'var(--font-display)'
      }
    }, /*#__PURE__*/React.createElement("span", null, "9:41"), /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        top: 9,
        width: 96,
        height: 26,
        background: '#0A2540',
        borderRadius: 20
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        gap: 5,
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "signal",
      size: 13
    }), /*#__PURE__*/React.createElement(Icon, {
      name: "wifi",
      size: 13
    }), /*#__PURE__*/React.createElement(Icon, {
      name: "battery-full",
      size: 15
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }
    }, children))), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-display)'
      }
    }, label));
  }
  function TabBar({
    active = 'home'
  }) {
    const items = [['home', 'Home'], ['users', 'Leads'], ['sparkles', 'AI'], ['user', 'Me']];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        flexShrink: 0,
        height: 64,
        borderTop: '1px solid var(--border-soft)',
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 6
      }
    }, items.map(([ic, l]) => {
      const on = active === ic || active === 'home' && ic === 'home';
      return /*#__PURE__*/React.createElement("div", {
        key: ic,
        style: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          color: on ? 'var(--emerald-600)' : 'var(--slate-400)'
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: ic,
        size: 21,
        strokeWidth: on ? 2.4 : 2
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 10,
          fontWeight: 700
        }
      }, l));
    }));
  }

  // --- Screen 1: Home ---
  function Home() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        overflowY: 'auto',
        padding: '6px 18px 16px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 18
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: 'var(--text-muted)',
        fontWeight: 600
      }
    }, "Good morning"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 21,
        fontWeight: 800,
        color: 'var(--navy-900)',
        fontFamily: 'var(--font-display)',
        letterSpacing: '-0.02em'
      }
    }, "Rashid \uD83D\uDC4B")), /*#__PURE__*/React.createElement(DS.Avatar, {
      name: "Rashid M",
      size: 40,
      status: "online"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'var(--gradient-navy)',
        borderRadius: 18,
        padding: 16,
        color: '#fff',
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        opacity: 0.7,
        fontWeight: 600
      }
    }, "Today's target"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'baseline',
        gap: 8,
        margin: '4px 0 12px'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 30,
        fontWeight: 800,
        fontFamily: 'var(--font-display)'
      }
    }, "3"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        opacity: 0.7
      }
    }, "of 5 deals closing")), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 7,
        background: 'rgba(255,255,255,0.15)',
        borderRadius: 5
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: '60%',
        height: '100%',
        background: 'var(--gradient-emerald)',
        borderRadius: 5
      }
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        background: '#fff',
        border: '1px solid var(--emerald-100)',
        borderRadius: 14,
        padding: 14,
        marginBottom: 18,
        display: 'flex',
        gap: 11
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 32,
        height: 32,
        borderRadius: 9,
        background: 'var(--gradient-emerald)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "sparkles",
      size: 16
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 800,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: 'var(--emerald-700)',
        marginBottom: 3
      }
    }, "AI Suggestion"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        lineHeight: 1.45,
        color: 'var(--text-body)'
      }
    }, "Call ", /*#__PURE__*/React.createElement("strong", null, "Ahmed Khan"), " now \u2014 82% close probability."))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 800,
        color: 'var(--navy-900)',
        fontFamily: 'var(--font-display)',
        marginBottom: 10
      }
    }, "Hot leads"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10
      }
    }, window.LEADS.slice(0, 3).map(l => /*#__PURE__*/React.createElement("div", {
      key: l.id,
      style: {
        background: '#fff',
        border: '1px solid var(--border-soft)',
        borderRadius: 14,
        padding: 12,
        display: 'flex',
        alignItems: 'center',
        gap: 11
      }
    }, /*#__PURE__*/React.createElement(DS.Avatar, {
      name: l.name,
      size: 40
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: 'var(--navy-900)'
      }
    }, l.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: 'var(--text-muted)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, l.vehicle)), /*#__PURE__*/React.createElement(DS.LeadScore, {
      score: l.score,
      showBar: false,
      size: "sm"
    }))))), /*#__PURE__*/React.createElement(TabBar, {
      active: "home"
    }));
  }

  // --- Screen 2: Lead detail ---
  function LeadDetail() {
    const l = window.LEADS[0];
    const acts = [['phone', 'Call', '#2563EB'], ['message-circle', 'WhatsApp', '#059669'], ['calendar-plus', 'Schedule', '#7C3AED']];
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        overflowY: 'auto'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'var(--gradient-navy)',
        padding: '12px 18px 22px',
        color: '#fff'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-left",
      size: 22
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 13,
        marginTop: 12
      }
    }, /*#__PURE__*/React.createElement(DS.Avatar, {
      name: l.name,
      size: 56
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 19,
        fontWeight: 800,
        fontFamily: 'var(--font-display)'
      }
    }, l.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        opacity: 0.75,
        fontFamily: 'var(--font-mono)'
      }
    }, l.phone))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 10,
        marginTop: 16
      }
    }, acts.map(([ic, t, c]) => /*#__PURE__*/React.createElement("div", {
      key: t,
      style: {
        flex: 1,
        background: 'rgba(255,255,255,0.12)',
        borderRadius: 13,
        padding: '11px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 5
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: ic,
      size: 19
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        fontWeight: 700
      }
    }, t))))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 18,
        display: 'flex',
        flexDirection: 'column',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: 'var(--navy-900)'
      }
    }, "AI Lead Score"), /*#__PURE__*/React.createElement(DS.LeadScore, {
      score: l.score
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        background: '#fff',
        border: '1px solid var(--emerald-100)',
        borderRadius: 14,
        padding: 14,
        display: 'flex',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 30,
        height: 30,
        borderRadius: 9,
        background: 'var(--gradient-emerald)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "sparkles",
      size: 15
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        lineHeight: 1.45,
        color: 'var(--text-body)'
      }
    }, "Viewed Corolla 4 times & responded positively to financing. ", /*#__PURE__*/React.createElement("strong", null, "Send finance quote."))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        color: 'var(--text-muted)',
        marginBottom: 8
      }
    }, "Status"), /*#__PURE__*/React.createElement(DS.Badge, {
      tone: "amber",
      dot: true
    }, "Negotiation")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        color: 'var(--text-muted)',
        marginBottom: 8
      }
    }, "Interested vehicle"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 11,
        background: '#fff',
        border: '1px solid var(--border-soft)',
        borderRadius: 13,
        padding: 11
      }
    }, /*#__PURE__*/React.createElement(window.VehicleThumb, {
      color: "#1F4E79",
      size: 44
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: 'var(--navy-900)'
      }
    }, "Toyota Corolla 2021"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: 'var(--emerald-700)'
      }
    }, "AED 64,500")))))), /*#__PURE__*/React.createElement("div", {
      style: {
        flexShrink: 0,
        padding: 14,
        borderTop: '1px solid var(--border-soft)',
        background: '#fff'
      }
    }, /*#__PURE__*/React.createElement(DS.Button, {
      variant: "accent",
      fullWidth: true,
      size: "lg",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "message-circle",
        size: 16
      })
    }, "Send WhatsApp follow-up")));
  }

  // --- Screen 3: AI assistant ---
  function MobileAI() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        flexShrink: 0,
        padding: '8px 18px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        borderBottom: '1px solid var(--border-soft)',
        background: '#fff'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 34,
        height: 34,
        borderRadius: 10,
        background: 'var(--gradient-emerald)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "sparkles",
      size: 17
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 800,
        color: 'var(--navy-900)',
        fontFamily: 'var(--font-display)'
      }
    }, "Copilot"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: 'var(--emerald-700)',
        fontWeight: 600
      }
    }, "\u25CF Online"))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        overflowY: 'auto',
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        alignSelf: 'flex-start',
        background: '#fff',
        border: '1px solid var(--border-soft)',
        padding: '11px 13px',
        borderRadius: '13px 13px 13px 4px',
        fontSize: 13,
        lineHeight: 1.5,
        maxWidth: '88%',
        color: 'var(--text-body)'
      }
    }, "Morning Rashid! 3 deals are closing today. Want your call list?"), /*#__PURE__*/React.createElement("div", {
      style: {
        alignSelf: 'flex-end',
        background: 'var(--navy-900)',
        color: '#fff',
        padding: '11px 13px',
        borderRadius: '13px 13px 4px 13px',
        fontSize: 13,
        maxWidth: '80%'
      }
    }, "Yes, who's first?"), /*#__PURE__*/React.createElement("div", {
      style: {
        alignSelf: 'flex-start',
        background: '#fff',
        border: '1px solid var(--border-soft)',
        padding: '11px 13px',
        borderRadius: '13px 13px 13px 4px',
        fontSize: 13,
        lineHeight: 1.5,
        maxWidth: '88%',
        color: 'var(--text-body)'
      }
    }, /*#__PURE__*/React.createElement("strong", null, "Ahmed Khan"), " \u2014 82% close. I drafted a WhatsApp message. Send it?"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8,
        flexWrap: 'wrap'
      }
    }, ['Send it ✓', 'Edit message', 'Next lead'].map(c => /*#__PURE__*/React.createElement("span", {
      key: c,
      style: {
        padding: '7px 12px',
        border: '1px solid var(--emerald-200)',
        background: 'var(--emerald-50)',
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 700,
        color: 'var(--emerald-700)'
      }
    }, c)))), /*#__PURE__*/React.createElement("div", {
      style: {
        flexShrink: 0,
        padding: 12,
        borderTop: '1px solid var(--border-soft)',
        background: '#fff',
        display: 'flex',
        gap: 8,
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        height: 42,
        background: 'var(--slate-100)',
        borderRadius: 999,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        fontSize: 13,
        color: 'var(--text-subtle)'
      }
    }, "Ask anything\u2026"), /*#__PURE__*/React.createElement("span", {
      style: {
        width: 42,
        height: 42,
        borderRadius: '50%',
        background: 'var(--gradient-emerald)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-up",
      size: 18
    }))));
  }
  function App() {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 40,
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '40px 20px'
      }
    }, /*#__PURE__*/React.createElement(Phone, {
      label: "Home"
    }, /*#__PURE__*/React.createElement(Home, null)), /*#__PURE__*/React.createElement(Phone, {
      label: "Lead Detail"
    }, /*#__PURE__*/React.createElement(LeadDetail, null)), /*#__PURE__*/React.createElement(Phone, {
      label: "AI Assistant"
    }, /*#__PURE__*/React.createElement(MobileAI, null)));
  }
  if (window.lucide) window.lucide.createIcons();
  ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mobile/mobile.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.AiInsight = __ds_scope.AiInsight;

__ds_ns.LeadScore = __ds_scope.LeadScore;

__ds_ns.ProgressRing = __ds_scope.ProgressRing;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
