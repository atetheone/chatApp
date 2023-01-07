import mongoose, { model, Schema } from "mongoose";

interface IMessage {
  content: string;
  at: Date;
}
interface IConversation {
  user_id1: string;
  user_id2: string;
  messages: IMessage[]
}

const conversationSchema = new Schema<IConversation>({
  user_id1: {
    type: String,
    required: true
  },
  user_id2: {
    type: String,
    required: true
  },
  messages: {
    type: [{
      content: String,
      at: Date
    }]
  }
},
{
  toJSON: {
    transform(doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
    },
  }
});
const ConversationModel = model<IConversation>("user", conversationSchema);
export { ConversationModel as Conversation };
