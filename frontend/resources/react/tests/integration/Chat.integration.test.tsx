import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Chat from "../features/chat/Chat";

describe("Chat Integration Tests", () => {
  test("ユーザーがメッセージを入力して送信できる", () => {
    render(<Chat />);
    const input =
      screen.getByPlaceholderText("メッセージを入力してください...");
    const sendButton = screen.getByLabelText("メッセージを送信");

    fireEvent.change(input, { target: { value: "こんにちは" } });
    fireEvent.click(sendButton);

    expect(screen.getByText("こんにちは")).toBeInTheDocument();
    expect(screen.getByText("あなた")).toBeInTheDocument();
  });

  test("AIからの応答が表示される", async () => {
    render(<Chat />);
    const input =
      screen.getByPlaceholderText("メッセージを入力してください...");
    const sendButton = screen.getByLabelText("メッセージを送信");

    fireEvent.change(input, { target: { value: "テストメッセージ" } });
    fireEvent.click(sendButton);

    // タイピングインジケーターが表示されることを確認
    await waitFor(() => {
      expect(screen.getByTestId("typing-indicator")).toBeInTheDocument();
    });

    // AI応答が表示されることを確認（どの応答でも良い）
    await waitFor(
      () => {
        const aiMessages = screen.getAllByTestId(/message-msg-2/);
        expect(aiMessages).toHaveLength(1);
      },
      { timeout: 4000 },
    );
  });

  test("タイピングインジケーターが表示される", async () => {
    render(<Chat />);
    const input =
      screen.getByPlaceholderText("メッセージを入力してください...");
    const sendButton = screen.getByLabelText("メッセージを送信");

    fireEvent.change(input, { target: { value: "テスト" } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByTestId("typing-indicator")).toBeInTheDocument();
    });
  });

  test("メッセージが時系列順に表示される", async () => {
    render(<Chat />);
    const input =
      screen.getByPlaceholderText("メッセージを入力してください...");
    const sendButton = screen.getByLabelText("メッセージを送信");

    // 最初のメッセージを送信
    fireEvent.change(input, { target: { value: "最初のメッセージ" } });
    fireEvent.click(sendButton);

    // 最初のメッセージが表示されるまで待機
    await waitFor(() => {
      expect(screen.getByText("最初のメッセージ")).toBeInTheDocument();
    });

    // AI応答が完了するまで待機（入力が再度有効になるまで）
    await waitFor(
      () => {
        const textarea =
          screen.getByPlaceholderText("メッセージを入力してください...");
        expect(textarea).not.toBeDisabled();
      },
      { timeout: 4000 },
    );

    // 2番目のメッセージを送信
    fireEvent.change(input, { target: { value: "2番目のメッセージ" } });
    fireEvent.click(sendButton);

    // ユーザーのメッセージが2件あることを確認
    await waitFor(() => {
      expect(screen.getByText("2番目のメッセージ")).toBeInTheDocument();
      const userMessages = screen.getAllByText("あなた");
      expect(userMessages).toHaveLength(2);
    });
  });

  test("Enterキーでメッセージが送信される", () => {
    render(<Chat />);
    const input =
      screen.getByPlaceholderText("メッセージを入力してください...");

    fireEvent.change(input, { target: { value: "エンターキーテスト" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(screen.getByText("エンターキーテスト")).toBeInTheDocument();
  });
});