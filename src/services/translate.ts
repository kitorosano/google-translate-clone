import {
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi
} from 'openai';
import type { FromLanguage, Language } from '../types.d';
import { SUPPORTED_LANGUAGES } from '../constants';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

const configuration = new Configuration({ apiKey });
const openai = new OpenAIApi(configuration);

export async function translate({
  fromLanguage,
  toLanguage,
  text
}: {
  fromLanguage: FromLanguage;
  toLanguage: Language;
  text: string;
}) {
  const messages = [
    {
      role: ChatCompletionRequestMessageRoleEnum.System,
      content:
        'You are an AI that translates text. You recieve a text from the user. Do not answer it, just translate it. The original language is surrounded by `{{` and `}}`. You can also recieve {{auto}} which means that you have to detect the leanguage. The language you translate to is surrounded by `[[` and `]]`.'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: 'Hola mundo {{Español}} [[English]]'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: 'Hello world'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: 'How are you? {{auto}} [[Portugués]]'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: 'Como você está?'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: 'Bom dia, com estas? {{Portugués}} [[Español]]'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: 'Buenos días, ¿cómo estás?'
    }
  ];

  const fromCode =
    fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage];

  const toCode = SUPPORTED_LANGUAGES[toLanguage];

  const completions = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      ...messages,
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: `${text} {{${fromCode}}} [[${toCode}]]`
      }
    ]
  });

  return completions.data.choices[0].message?.content;
}
