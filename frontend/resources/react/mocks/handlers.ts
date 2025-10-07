import { http, HttpResponse } from "msw";
import { ChatResponse } from "../types/types";

export const handlers = [
  http.post("/api/chat", async ({ request }) => {
    await request.json();

    // ランダムな遅延をシミュレート
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // ランダムなAI応答を選択
    const response: ChatResponse = {
      user_id: "user_001",
      session_id: "abcd-efgh-1234",
      documents: [
        {
          content:
            "フィッシング相談件数の推移は2020年から2023年にかけて増加傾向にあります。特に2022年以降、急激な増加が見られます。",
          metadata: {
            id: "1234",
            producer: "IPA",
            creator: "情報セキュリティ部",
            creation_date: new Date("2024-01-15"),
            page: 63,
          },
        },
        {
          content:
            "具体的な数値としては、2020年は約5万件、2021年は約7万件、2022年は約12万件となっています。",
          metadata: {
            id: "1235",
            producer: "IPA",
            creator: "情報セキュリティ部",
            creation_date: new Date("2024-01-15"),
            page: 64,
          },
        },
      ],
    };

    return HttpResponse.json(response);
  }),

  // エラーケース用のハンドラー
  // http.post("/api/chat/error", () => {
  //   return HttpResponse.json(
  //     { error: "Internal Server Error" },
  //     { status: 500 },
  //   );
  // }),
];
