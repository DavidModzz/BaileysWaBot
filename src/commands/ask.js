import { Hercai } from "hercai";

export default {
  name: "ask",
  alias: ["gpt", "chatgpt"],

  run: async (socket, msg, args) => {
    try {
      const content = args.join(" ") || "Hola";

      socket.sendMessage(msg.messages[0].key.remoteJid, {
        react: { text: "📝", key: msg.messages[0]?.key },
      });

      const response = await new Hercai().question({
        content,
        model: "v3-beta",
      });

      await socket.sendMessage(msg.messages[0].key.remoteJid, {
        text: response.reply,
      });

      socket.sendMessage(msg.messages[0].key.remoteJid, {
        react: { text: "", key: msg.messages[0]?.key },
      });
    } catch (error) {
      console.error(error);

      await socket.sendMessage(msg.messages[0].key.remoteJid, {
        text: "Sucedió un error inesperado.",
      });

      socket.sendMessage(msg.messages[0].key.remoteJid, {
        react: { text: "", key: msg.messages[0]?.key },
      });
    }
  },
};
