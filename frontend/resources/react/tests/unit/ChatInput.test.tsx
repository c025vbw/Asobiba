import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ChatInput from "../../features/chat/ChatInput";

describe("ChatInput Component Unit Tests", () => {
  const mockOnSendMessage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("初期状態で正しくレンダリングされる", () => {
    render(<ChatInput onSendMessage={mockOnSendMessage} />);

    const textarea =
      screen.getByPlaceholderText("メッセージを入力してください...");
    const sendButton = screen.getByLabelText("メッセージを送信");
    const helpText = screen.getByText("Enterで送信、Shift+Enterで改行");

    expect(textarea).toBeInTheDocument();
    expect(sendButton).toBeInTheDocument();
    expect(helpText).toBeInTheDocument();
    expect(textarea).toHaveValue("");
    expect(sendButton).toBeDisabled();
  });

  test("テキスト入力時に状態が正しく更新される", () => {
    render(<ChatInput onSendMessage={mockOnSendMessage} />);

    const textarea =
      screen.getByPlaceholderText("メッセージを入力してください...");
    const sendButton = screen.getByLabelText("メッセージを送信");

    fireEvent.change(textarea, { target: { value: "テストメッセージ" } });

    expect(textarea).toHaveValue("テストメッセージ");
    expect(sendButton).not.toBeDisabled();
  });

  test("送信ボタンクリックでメッセージが送信される", () => {
    render(<ChatInput onSendMessage={mockOnSendMessage} />);

    const textarea =
      screen.getByPlaceholderText("メッセージを入力してください...");
    const sendButton = screen.getByLabelText("メッセージを送信");

    fireEvent.change(textarea, { target: { value: "テストメッセージ" } });
    fireEvent.click(sendButton);

    expect(mockOnSendMessage).toHaveBeenCalledWith("テストメッセージ");
    expect(mockOnSendMessage).toHaveBeenCalledTimes(1);
    expect(textarea).toHaveValue("");
    expect(sendButton).toBeDisabled();
  });

  test("Enterキーでメッセージが送信される", () => {
    render(<ChatInput onSendMessage={mockOnSendMessage} />);

    const textarea =
      screen.getByPlaceholderText("メッセージを入力してください...");

    fireEvent.change(textarea, { target: { value: "エンターキーテスト" } });
    fireEvent.keyDown(textarea, { key: "Enter", code: "Enter" });

    expect(mockOnSendMessage).toHaveBeenCalledWith("エンターキーテスト");
    expect(mockOnSendMessage).toHaveBeenCalledTimes(1);
    expect(textarea).toHaveValue("");
  });

  test("Shift+Enterでは送信されない（改行が追加される）", () => {
    render(<ChatInput onSendMessage={mockOnSendMessage} />);

    const textarea =
      screen.getByPlaceholderText("メッセージを入力してください...");

    fireEvent.change(textarea, { target: { value: "改行テスト" } });
    fireEvent.keyDown(textarea, {
      key: "Enter",
      code: "Enter",
      shiftKey: true,
    });

    expect(mockOnSendMessage).not.toHaveBeenCalled();
    expect(textarea).toHaveValue("改行テスト");
  });

  test("空文字列では送信されない", () => {
    render(<ChatInput onSendMessage={mockOnSendMessage} />);

    const textarea =
      screen.getByPlaceholderText("メッセージを入力してください...");
    const sendButton = screen.getByLabelText("メッセージを送信");

    fireEvent.change(textarea, { target: { value: "" } });
    fireEvent.click(sendButton);

    expect(mockOnSendMessage).not.toHaveBeenCalled();
    expect(sendButton).toBeDisabled();
  });

  test("空白のみの文字列では送信されない", () => {
    render(<ChatInput onSendMessage={mockOnSendMessage} />);

    const textarea =
      screen.getByPlaceholderText("メッセージを入力してください...");
    const sendButton = screen.getByLabelText("メッセージを送信");

    fireEvent.change(textarea, { target: { value: "   " } });
    fireEvent.click(sendButton);

    expect(mockOnSendMessage).not.toHaveBeenCalled();
    expect(sendButton).toBeDisabled();
  });

  test("disabled状態では操作が無効になる", () => {
    render(<ChatInput onSendMessage={mockOnSendMessage} disabled={true} />);

    const textarea =
      screen.getByPlaceholderText("メッセージを入力してください...");
    const sendButton = screen.getByLabelText("メッセージを送信");

    expect(textarea).toBeDisabled();
    expect(sendButton).toBeDisabled();

    // disabled状態でもテキスト入力を試す
    fireEvent.change(textarea, { target: { value: "テスト" } });
    fireEvent.click(sendButton);

    expect(mockOnSendMessage).not.toHaveBeenCalled();
  });

  test("disabled状態でEnterキーを押しても送信されない", () => {
    render(<ChatInput onSendMessage={mockOnSendMessage} disabled={true} />);

    const textarea =
      screen.getByPlaceholderText("メッセージを入力してください...");

    fireEvent.change(textarea, { target: { value: "テスト" } });
    fireEvent.keyDown(textarea, { key: "Enter", code: "Enter" });

    expect(mockOnSendMessage).not.toHaveBeenCalled();
  });

  test("送信ボタンの状態がcanSendに基づいて正しく変化する", () => {
    render(<ChatInput onSendMessage={mockOnSendMessage} />);

    const textarea =
      screen.getByPlaceholderText("メッセージを入力してください...");
    const sendButton = screen.getByLabelText("メッセージを送信");

    // 初期状態：disabled
    expect(sendButton).toBeDisabled();
    expect(sendButton).toHaveClass("bg-gray-300", "cursor-not-allowed");

    // テキスト入力後：enabled
    fireEvent.change(textarea, { target: { value: "テスト" } });
    expect(sendButton).not.toBeDisabled();
    expect(sendButton).toHaveClass("bg-blue-500");
  });

  test("プレースホルダーテキストが正しく表示される", () => {
    render(<ChatInput onSendMessage={mockOnSendMessage} />);

    const textarea =
      screen.getByPlaceholderText("メッセージを入力してください...");
    expect(textarea).toHaveAttribute(
      "placeholder",
      "メッセージを入力してください...",
    );
  });

  test("aria-labelが正しく設定される", () => {
    render(<ChatInput onSendMessage={mockOnSendMessage} />);

    const sendButton = screen.getByLabelText("メッセージを送信");
    expect(sendButton).toHaveAttribute("aria-label", "メッセージを送信");
  });
});
