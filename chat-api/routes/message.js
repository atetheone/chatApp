const { getMessages, addMessage } = require('../services/message.service');

module.export = (app) => {
  app.get("/messages", async (req, res) => {
    try {
      const messages = await getMessages();
      res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err);
    }
  });

  app.post('/messages/create', async (req, res) => {
    try {
        const result = await addMessage();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
  });
};
