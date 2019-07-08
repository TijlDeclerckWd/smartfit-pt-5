export interface Conversation {
  _id: string;
  client: {} | string;
  trainer: {} | string;
  messages: {}[];
  seenMessages: Number;
}
