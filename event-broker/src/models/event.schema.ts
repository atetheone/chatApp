import { model, Schema, SchemaTypes } from "mongoose";

interface IEvent {
  topic: string;
  time: string;
  payload: any;
}

const eventSchema = new Schema<IEvent>({
  topic: {
    type: String,
    required: true
  },
  time: {
    type: String,
    default: new Date().toISOString()
  },
  payload: {
    type: SchemaTypes
  }
});

const eventModel = model<IEvent>("event", eventSchema);

export { eventModel as Event };
