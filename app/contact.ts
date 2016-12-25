export class Contact {
  dialog_id: string;
  name?: string;
  last_message: LastMessage;
}

export class LastMessage {
  guid: string;
  type: string;
  content: string;
  sender: string;
  timestamp: number;
  text: string;
}
