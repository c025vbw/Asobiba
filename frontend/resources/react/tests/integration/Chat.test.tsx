import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import Chat from "../../features/chat/Chat";

describe("Chat Component", () => {
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

  test("メッセージを送信すると、モックAPIのレスポンスのdocumentsが表示される", async () => {
    render(<Chat />);

    const input =
      screen.getByPlaceholderText("メッセージを入力してください...");
    const sendButton = screen.getByLabelText("メッセージを送信");

    // ユーザー入力
    fireEvent.change(input, {
      target: { value: "フィッシング相談件数の推移は？" },
    });

    // 送信ボタンをクリック
    fireEvent.click(sendButton);

    // モックAPIからのレスポンスが表示されることを確認
    // AIの応答が表示されるまで待つ（正規表現で部分一致）
    await waitFor(
      async () => {
        const text = await screen.findByText(
          /フィッシング相談件数の推移は2020年から2023年にかけて増加傾向/,
        );
        expect(text).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
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

  test("空のメッセージは送信されない", () => {
    render(<Chat />);
    const sendButton = screen.getByLabelText("メッセージを送信");

    fireEvent.click(sendButton);

    expect(screen.queryByTestId(/message-/)).not.toBeInTheDocument();
  });

  test("Enterキーでメッセージが送信される", () => {
    render(<Chat />);
    const input =
      screen.getByPlaceholderText("メッセージを入力してください...");

    fireEvent.change(input, { target: { value: "エンターキーテスト" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(screen.getByText("エンターキーテスト")).toBeInTheDocument();
  });
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

  // test("タイピングインジケーターが表示される", async () => {
  //   render(<Chat />);
  //   const input =
  //     screen.getByPlaceholderText("メッセージを入力してください...");
  //   const sendButton = screen.getByLabelText("メッセージを送信");

  //   fireEvent.change(input, { target: { value: "テスト" } });
  //   fireEvent.click(sendButton);

  //   await waitFor(() => {
  //     expect(screen.getByTestId("typing-indicator")).toBeInTheDocument();
  //   });
  // });

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
