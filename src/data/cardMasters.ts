export const cardMasters = {
  舞踏会吟子: {
    effects: [
      { type: "ボルテージブースト", value: 253 },
      { type: "スコアブースト", value: 253 },
    ],
  },
  舞踏会さやか: {
    effects: [
      {
        type: "ボルテージゲイン",
        value: 326,
        condition: { type: "チル", value: 7 },
      },
      {
        type: "スコアブースト",
        value: 558,
        condition: { type: "グルーヴィ", value: 8 },
      },
      {
        type: "ボルテージゲイン",
        value: -50,
        condition: { type: "グルーヴィ", value: 8 },
      },
    ],
  },
  銀河梢: {
    effects: [
      {
        type: "ボルテージブースト",
        value: 324,
        condition: { type: "回数以下", value: 3, scope: "self" },
      },
      {
        type: "リセット",
        condition: { type: "回数以下", value: 3, scope: "self" },
      },
      {
        type: "スコアブースト",
        value: 324,
        condition: { type: "回数以上", value: 4, scope: "self" },
      },
    ],
  },
  舞踏会瑠璃乃: {
    effects: [
      {
        type: "ボルテージブースト",
        value: 326.25,
        condition: { type: "チル", value: 7 },
      },
      {
        type: "スコアブースト",
        value: 435,
        condition: { type: "グルーヴィ", value: 8 },
      },
    ],
  },
  LR綴理: {
    effects: [
      { type: "ボルテージゲイン", value: 729 },
      {
        type: "ボルテージゲイン",
        value: 1170,
        condition: { type: "回数以上", value: 10, scope: "global" },
      },
    ],
  },
  "BLAST!!姫芽": {
    effects: [{ type: "スコアアップ", value: 918 }],
  },
};
