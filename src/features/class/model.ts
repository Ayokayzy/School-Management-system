import { Schema, model, Document } from "mongoose";

export interface ClassType extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  createdBy: Schema.Types.ObjectId;
}

const classSchema: Schema = new Schema({
  name: {
    type: String,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
  },
});

export const Class = model<ClassType>("Class", classSchema);
