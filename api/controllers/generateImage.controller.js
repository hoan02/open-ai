import { openai } from "../server.js";
import createError from "../utils/createError.js";

export const generateImage = async (req, res, next) => {
  try {
    const aiResponse = await openai.createImage({
      prompt: req.body.prompt,
      n: 1,
      size: req.body.size,
      response_format: "b64_json",
    });

    const image = aiResponse.data.data[0].b64_json;
    res.status(200).json({ photo: image });
  } catch (error) {
    next(createError(500, "Error creating image"));
  }
};
