/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  BookOpenText,
  Search,
  Sparkles,
  X,
  Send,
  Landmark,
  ScrollText,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const OPENROUTER_API_KEY = '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'; // ⚠️ Keep this safe in production

type ActionType = 'history' | 'religion' | 'kingship' | 'chat' | null;

interface FormData {
  subject: string;
  topic: string;
  subtopic: string;
  input: string;
}

interface ChatMessage {
  user: string;
  ai: string;
}

const AIAssistantMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeAction, setActiveAction] = useState<ActionType>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [formData, setFormData] = useState<FormData>({
    subject: '',
    topic: '',
    subtopic: '',
    input: '',
  });
  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLog]);

  // Direct fetch (keeping inline as requested)
  const fetchAI = async (prompt: string): Promise<string> => {
    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'mistralai/mistral-7b-instruct',
          messages: [{ role: 'user', content: prompt }],
        }),
      });

      const json = await res.json();
      return json.choices?.[0]?.message?.content || 'No response.';
    } catch (err) {
      console.error(err);
      return '⚠️ Error: Unable to connect to AI service.';
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setResult('');

    let prompt = '';
    if (activeAction === 'history') {
      prompt = `Provide a detailed historical overview about this topic in the context of the Zazzau Emirate:\nTopic: ${formData.topic}\nInclude information about heritage, traditions, and notable figures.`;
    } else if (activeAction === 'religion') {
      prompt = `Explain the religious significance and cultural influence of this topic in the Zazzau Emirate:\nTopic: ${formData.topic}\nProvide references to Islamic scholarship and local traditions.`;
    } else if (activeAction === 'kingship') {
      prompt = `Describe the leadership, governance, and cultural aspects of kingship related to this topic within the Zazzau Emirate:\nTopic: ${formData.topic}\nInclude details about Emirs, royal customs, and societal structure.`;
    } else if (activeAction === 'chat') {
      prompt = `You are an AI Scholar of the Zazzau Emirate. Answer this question with cultural, historical, and religious depth:\n${formData.input}`;
      setChatLog(prev => [...prev, { user: formData.input, ai: '' }]);
    }

    const aiResponse = await fetchAI(prompt);

    if (activeAction === 'chat') {
      setChatLog(prev => {
        const updated = [...prev];
        updated[updated.length - 1].ai = aiResponse;
        return updated;
      });
      setFormData({ ...formData, input: '' });
    } else {
      setResult(aiResponse);
    }

    setLoading(false);
  };

  const options = [
    { title: 'Zazzau History', icon: ScrollText, action: 'history' },
    { title: 'Religion & Scholarship', icon: BookOpenText, action: 'religion' },
    { title: 'Kingship & Leadership', icon: Landmark, action: 'kingship' },
    { title: 'Ask the Emirate Scholar', icon: Sparkles, action: 'chat' },
  ];

  const renderResult = () => {
    if (!result) return null;

    return (
      <div className="mt-4 text-sm text-gray-800 bg-gray-50 p-3 rounded">
        <h4 className="font-bold mb-1 text-[#8B5E3C]">Insight:</h4>
        <p className="whitespace-pre-line">{result}</p>
      </div>
    );
  };

  return (
    <>
      {/* Floating Button & Menu */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <AnimatePresence>
          {isOpen && !activeAction && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="mb-3 w-64 bg-white border rounded-lg shadow-lg p-2"
            >
              {options.map(({ title, icon: Icon, action }, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveAction(action as any);
                    setIsOpen(false);
                    setResult('');
                  }}
                  className="flex items-center gap-2 p-2 text-sm text-gray-700 hover:bg-[#F6EEE3] rounded w-full"
                >
                  <Icon className="w-4 h-4 text-[#8B5E3C]" />
                  {title}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => {
            if (activeAction) return;
            setIsOpen(prev => !prev);
          }}
          className="bg-[#8B5E3C] hover:bg-[#6D4528] text-white p-4 rounded-full shadow-lg transition"
        >
          {activeAction ? <X className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
        </button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeAction && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveAction(null)}
          >
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              exit={{ y: 50 }}
              transition={{ type: 'spring', bounce: 0.2 }}
              className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-[#8B5E3C] capitalize">
                  {activeAction === 'history'
                    ? 'Zazzau Emirate History'
                    : activeAction === 'religion'
                    ? 'Religion & Scholarship'
                    : activeAction === 'kingship'
                    ? 'Kingship & Leadership'
                    : 'Ask the Emirate Scholar'}
                </h2>
                <button onClick={() => setActiveAction(null)}>
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {activeAction !== 'chat' ? (
                <>
                  <input
                    type="text"
                    placeholder="Enter topic..."
                    value={formData.topic}
                    onChange={e =>
                      setFormData({ ...formData, topic: e.target.value })
                    }
                    className="w-full border px-3 py-2 rounded mb-2 text-sm"
                  />

                  <div className="flex justify-end">
                    <button
                      onClick={handleSubmit}
                      className="bg-[#8B5E3C] hover:bg-[#6D4528] text-white px-4 py-2 rounded text-sm"
                      disabled={loading}
                    >
                      {loading ? 'Loading...' : 'Explore'}
                    </button>
                  </div>

                  {renderResult()}
                </>
              ) : (
                <div className="flex flex-col max-h-80">
                  <div className="flex-1 overflow-y-auto p-2 space-y-3">
                    {chatLog.map((msg, i) => (
                      <div key={i} className="space-y-1">
                        <div className="text-sm font-medium text-[#8B5E3C]">You:</div>
                        <div className="text-xs text-gray-700 px-2 py-1 bg-gray-100 rounded">
                          {msg.user}
                        </div>
                        <div className="text-sm font-medium text-green-900">Emirate Scholar:</div>
                        <div className="text-xs text-gray-700 px-2 py-1 bg-gray-50 rounded">
                          {msg.ai}
                        </div>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>
                  <div className="mt-2 flex gap-2">
                    <input
                      type="text"
                      placeholder="Ask about Zazzau culture, leaders, or faith..."
                      value={formData.input}
                      onChange={e =>
                        setFormData({ ...formData, input: e.target.value })
                      }
                      className="flex-1 border px-3 py-2 rounded text-sm"
                    />
                    <button
                      onClick={handleSubmit}
                      className="bg-[#8B5E3C] hover:bg-[#6D4528] text-white px-4 py-2 rounded"
                      disabled={loading}
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistantMenu;
