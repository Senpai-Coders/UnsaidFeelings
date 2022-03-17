const mongoose = require("mongoose");

const unsentFeelings = mongoose.Schema({
  to: { type: String, required: true },
  from: { type: String, default: "Anonymous" },
  message: { type: String, required: true },
  cat: { type: Date, default: Date.now },
  theme: {
    type: {},
    default: {
      theme_name: "CreamyWhite",
      holder_txt: "text-neutral-600",
      holder_bg: "bg-zinc-100",
      holder_texture: "",
      content_bg: "bg-stone-50",
      content_txt: "text-neutral-600",
      content_pattern:
        "https://cdn.discordapp.com/attachments/912411399458795593/953836621382451301/Grid-Finest.png",
    },
  },
  views: { type: Number, default: 0 },
});

module.exports = mongoose.model("unsentFeeling", unsentFeelings);
