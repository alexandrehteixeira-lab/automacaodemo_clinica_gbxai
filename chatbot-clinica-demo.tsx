import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, Phone, Calendar, Clock, Star, CheckCircle, X, Bot, User, Smile } from 'lucide-react';

const ChatbotDemo = () => {
  const [currentFlow, setCurrentFlow] = useState('home');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [selectedScenario, setSelectedScenario] = useState(null);
  const messagesEndRef = useRef(null);
  const [demoStats, setDemoStats] = useState({
    messagesProcessed: 247,
    appointmentsConfirmed: 89,
    satisfactionScore: 4.8,
    responseTime: '< 1min'
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Cenários de demonstração
  const scenarios = [
    {
      id: 'confirmation',
      title: '🔔 Confirmação de Consulta',
      description: 'Confirma automaticamente agendamentos'
    },
    {
      id: 'reschedule',
      title: '📅 Reagendamento',
      description: 'Facilita reagendamento de consultas'
    },
    {
      id: 'satisfaction',
      title: '⭐ Pesquisa de Satisfação',
      description: 'Coleta feedback pós-atendimento'
    },
    {
      id: 'lead',
      title: '🎯 Captação de Lead',
      description: 'Qualifica novos interessados'
    },
    {
      id: 'reactivation',
      title: '💎 Reativação de Paciente',
      description: 'Ofertas para pacientes inativos'
    }
  ];

  // Fluxos de conversa por cenário
  const conversationFlows = {
    confirmation: [
      { type: 'bot', text: '🦷 Olá Maria! Sou a assistente virtual da Clínica Sorrir+\n\nVocê tem uma consulta agendada para:\n📅 **Amanhã (16/08) às 14:00**\n👩‍⚕️ **Dra. Ana - Limpeza Dental**\n\nPoderia confirmar sua presença?' },
      { type: 'options', options: ['✅ Confirmar', '📅 Reagendar', '❌ Cancelar'] },
    ],
    confirmation_confirm: [
      { type: 'bot', text: '✅ **Consulta confirmada com sucesso!**\n\n📍 **Endereço:** Rua das Flores, 123\n🅿️ **Estacionamento:** Gratuito\n⏰ **Chegada:** 15min antes\n\n📱 Qualquer dúvida, me chame aqui!\n\n*Enviamos um lembrete 2h antes da consulta.*' },
      { type: 'bot', text: '😊 Até amanhã, Maria!' }
    ],
    reschedule: [
      { type: 'bot', text: '📅 Sem problemas! Vou te ajudar a reagendar.\n\n**Horários disponíveis esta semana:**\n\n🗓️ **Quinta (17/08)**\n• 10:00 ✅\n• 16:30 ✅\n\n🗓️ **Sexta (18/08)**\n• 09:00 ✅\n• 14:00 ✅\n\nQual horário prefere?' },
      { type: 'options', options: ['🌅 Quinta 10:00', '🌆 Quinta 16:30', '🌅 Sexta 09:00', '🌄 Sexta 14:00'] }
    ],
    reschedule_confirm: [
      { type: 'bot', text: '🎉 **Reagendamento realizado!**\n\n📅 **Nova data:** Quinta (17/08) às 10:00\n👩‍⚕️ **Dra. Ana - Limpeza Dental**\n\n✉️ Confirmação enviada por email\n📱 Lembrete automático 24h antes\n\nAlguma dúvida?' },
      { type: 'options', options: ['👍 Tudo certo!', '❓ Tenho dúvidas'] }
    ],
    satisfaction: [
      { type: 'bot', text: '⭐ Oi João! Como foi seu atendimento hoje com Dr. Carlos?\n\nSua opinião é muito importante para melhorarmos sempre! 😊' },
      { type: 'rating', question: 'Como você avalia seu atendimento?' },
    ],
    satisfaction_rating: [
      { type: 'bot', text: '🌟 Obrigada pela avaliação!\n\nO que mais gostou no atendimento?' },
      { type: 'options', options: ['👨‍⚕️ Profissionalismo', '⏰ Pontualidade', '🏢 Ambiente', '💰 Preço justo', '✨ Resultado'] }
    ],
    satisfaction_complete: [
      { type: 'bot', text: '💙 Ficamos muito felizes com seu feedback!\n\n🎁 **Oferta especial:** 20% de desconto na próxima consulta de manutenção!\n\n📅 Que tal já agendar? Temos disponibilidade em:\n• Segunda: 14:00\n• Terça: 10:00\n• Quarta: 16:00' },
      { type: 'options', options: ['📅 Agendar agora', '⏰ Lembrar depois', '📞 Quero ligar'] }
    ],
    lead: [
      { type: 'bot', text: '✨ Olá! Bem-vindo(a) à Clínica Beleza & Saúde!\n\nVi que você tem interesse em nossos tratamentos de estética. \n\nEm que posso te ajudar hoje? 😊' },
      { type: 'options', options: ['💉 Botox', '✨ Harmonização', '🧴 Skincare', '💋 Preenchimento', '📋 Outros'] }
    ],
    lead_botox: [
      { type: 'bot', text: '💉 **Botox - Tratamento Premium**\n\n✅ Profissionais especializados\n✅ Produtos importados certificados\n✅ Resultado natural e duradouro\n✅ Primeira consulta: **GRÁTIS**\n\n💰 **Promoção:** 3x sem juros\n\nQual sua principal preocupação?' },
      { type: 'options', options: ['😤 Rugas de expressão', '👁️ Pés de galinha', '🤔 Testa', '❓ Tenho dúvidas'] }
    ],
    lead_info: [
      { type: 'bot', text: '👩‍⚕️ **Dra. Marina** é nossa especialista em Botox, com mais de 1000 procedimentos realizados!\n\n📅 **Consulta gratuita disponível:**\n• Amanhã: 16:00\n• Quinta: 14:00  \n• Sexta: 10:00\n\n📱 Para agendar, preciso apenas de:\n• Nome completo\n• Telefone\n\nPosso agendar para você?' },
      { type: 'options', options: ['✅ Sim, quero agendar', '🤔 Quero saber mais', '💰 Qual o valor?'] }
    ],
    reactivation: [
      { type: 'bot', text: '💎 Oi Carla! Sentimos sua falta aqui na clínica!\n\nVi que sua última consulta foi há 6 meses. Como você está?\n\n🎁 **Oferta especial de retorno:**\n**50% OFF** em qualquer procedimento!\n\nVálida apenas até domingo. Que tal voltarmos a cuidar da sua beleza?' },
      { type: 'options', options: ['😍 Quero aproveitar!', '🤔 Que procedimentos?', '📞 Prefiro ligar'] }
    ],
    reactivation_procedures: [
      { type: 'bot', text: '✨ **Procedimentos disponíveis com 50% OFF:**\n\n💉 Botox - de R$ 800 por **R$ 400**\n🧴 Skincare facial - de R$ 300 por **R$ 150**  \n💋 Preenchimento labial - de R$ 600 por **R$ 300**\n✨ Harmonização facial - de R$ 1200 por **R$ 600**\n\n📅 **Horários esta semana:**\n• Quinta: 15:00\n• Sexta: 11:00\n• Sábado: 09:00\n\nQual procedimento te interessa?' },
      { type: 'options', options: ['💉 Botox', '🧴 Skincare', '💋 Preenchimento', '📅 Ver agenda'] }
    ]
  };

  const addMessage = (message) => {
    setMessages(prev => [...prev, { ...message, id: Date.now() + Math.random() }]);
  };

  const simulateTyping = () => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 1500);
  };

  const startScenario = (scenarioId) => {
    setSelectedScenario(scenarioId);
    setMessages([]);
    setCurrentFlow(scenarioId);
    
    setTimeout(() => {
      const flow = conversationFlows[scenarioId];
      if (flow) {
        simulateTyping();
        setTimeout(() => {
          addMessage(flow[0]);
          if (flow[1]) {
            setTimeout(() => addMessage(flow[1]), 1000);
          }
        }, 1500);
      }
    }, 500);
  };

  const handleUserResponse = (response, nextFlow = null) => {
    // Adiciona resposta do usuário
    addMessage({ type: 'user', text: response });
    
    simulateTyping();
    
    setTimeout(() => {
      let flowKey = nextFlow;
      
      // Lógica de fluxo baseada na resposta
      if (currentFlow === 'confirmation' && response === '✅ Confirmar') {
        flowKey = 'confirmation_confirm';
      } else if (currentFlow === 'confirmation' && response === '📅 Reagendar') {
        flowKey = 'reschedule';
      } else if (currentFlow === 'reschedule' && response.includes('Quinta')) {
        flowKey = 'reschedule_confirm';
      } else if (currentFlow === 'satisfaction' && response.includes('estrela')) {
        flowKey = 'satisfaction_rating';
      } else if (currentFlow === 'satisfaction_rating') {
        flowKey = 'satisfaction_complete';
      } else if (currentFlow === 'lead' && response === '💉 Botox') {
        flowKey = 'lead_botox';
      } else if (currentFlow === 'lead_botox') {
        flowKey = 'lead_info';
      } else if (currentFlow === 'reactivation' && response === '🤔 Que procedimentos?') {
        flowKey = 'reactivation_procedures';
      }
      
      if (flowKey && conversationFlows[flowKey]) {
        const flow = conversationFlows[flowKey];
        flow.forEach((msg, index) => {
          setTimeout(() => {
            addMessage(msg);
          }, (index + 1) * 800);
        });
        setCurrentFlow(flowKey);
      }
    }, 1500);
  };

  const renderMessage = (message) => {
    if (message.type === 'bot') {
      return (
        <div key={message.id} className="flex items-start space-x-3 mb-4">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="flex-1 max-w-xs lg:max-w-md">
            <div className="bg-gray-100 rounded-lg px-4 py-2">
              <p className="text-sm whitespace-pre-line">{message.text}</p>
            </div>
          </div>
        </div>
      );
    }

    if (message.type === 'user') {
      return (
        <div key={message.id} className="flex items-start space-x-3 mb-4 justify-end">
          <div className="flex-1 max-w-xs lg:max-w-md">
            <div className="bg-blue-500 text-white rounded-lg px-4 py-2">
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      );
    }

    if (message.type === 'options') {
      return (
        <div key={message.id} className="flex flex-col space-y-2 mb-4 ml-11">
          {message.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleUserResponse(option)}
              className="text-left bg-white border border-gray-200 rounded-lg px-3 py-2 hover:bg-blue-50 hover:border-blue-300 transition-colors text-sm"
            >
              {option}
            </button>
          ))}
        </div>
      );
    }

    if (message.type === 'rating') {
      return (
        <div key={message.id} className="mb-4 ml-11">
          <p className="text-sm text-gray-600 mb-2">{message.question}</p>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleUserResponse(`${star} estrelas`)}
                className="text-yellow-400 hover:text-yellow-500 transition-colors"
              >
                <Star className="w-6 h-6 fill-current" />
              </button>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  const resetDemo = () => {
    setSelectedScenario(null);
    setMessages([]);
    setCurrentFlow('home');
  };

  if (!selectedScenario) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <MessageCircle className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Chatbot Inteligente para Clínicas
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Demonstração interativa do sistema de automação conversacional para clínicas de estética e odontológicas
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{demoStats.messagesProcessed}</div>
            <div className="text-sm text-blue-600">Mensagens processadas</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{demoStats.appointmentsConfirmed}</div>
            <div className="text-sm text-green-600">Consultas confirmadas</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">{demoStats.satisfactionScore}</div>
            <div className="text-sm text-yellow-600">Nota de satisfação</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{demoStats.responseTime}</div>
            <div className="text-sm text-purple-600">Tempo de resposta</div>
          </div>
        </div>

        {/* Scenarios */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            Escolha um cenário para demonstração:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scenarios.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => startScenario(scenario.id)}
                className="p-6 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all text-left group"
              >
                <div className="text-2xl mb-2">{scenario.title}</div>
                <p className="text-gray-600 text-sm group-hover:text-gray-900">
                  {scenario.description}
                </p>
                <div className="mt-4 text-blue-600 text-sm font-medium">
                  Clique para demonstrar →
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6">
            <Clock className="w-8 h-8 text-blue-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">24/7 Disponível</h3>
            <p className="text-gray-600 text-sm">Atende seus pacientes a qualquer hora, mesmo fora do horário comercial</p>
          </div>
          <div className="text-center p-6">
            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Respostas Inteligentes</h3>
            <p className="text-gray-600 text-sm">IA treinada especificamente para o contexto de clínicas médicas</p>
          </div>
          <div className="text-center p-6">
            <Phone className="w-8 h-8 text-purple-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Multi-canal</h3>
            <p className="text-gray-600 text-sm">Integração com WhatsApp, site, Facebook e outros canais</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold">Assistente Virtual</h3>
              <p className="text-blue-100 text-sm">Clínica Sorrir+</p>
            </div>
          </div>
          <button
            onClick={resetDemo}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map(renderMessage)}
        
        {isTyping && (
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-gray-100 rounded-lg px-4 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t p-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
            onKeyPress={(e) => {
              if (e.key === 'Enter' && userInput.trim()) {
                handleUserResponse(userInput.trim());
                setUserInput('');
              }
            }}
          />
          <button
            onClick={() => {
              if (userInput.trim()) {
                handleUserResponse(userInput.trim());
                setUserInput('');
              }
            }}
            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="text-xs text-gray-500 text-center mt-2">
          💡 Clique nas opções ou digite livremente
        </div>
      </div>

      {/* Demo indicator */}
      <div className="bg-green-50 border-t border-green-200 px-4 py-2">
        <div className="flex items-center justify-center space-x-2 text-green-700">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-medium">MODO DEMONSTRAÇÃO ATIVO</span>
        </div>
      </div>
    </div>
  );
};

export default ChatbotDemo;