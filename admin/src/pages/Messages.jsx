import React, { useState, useEffect } from 'react';
import { Mail, Trash2, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { messagesAPI } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { formatDate, truncateText } from '../lib/utils';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filter, setFilter] = useState('all'); // all, new, read, replied

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const data = await messagesAPI.getMessages();
      setMessages(data);
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateMessageStatus = async (id, status) => {
    try {
      await messagesAPI.updateMessageStatus(id, status);
      await loadMessages();
      if (selectedMessage && selectedMessage._id === id) {
        setSelectedMessage({ ...selectedMessage, status });
      }
    } catch (error) {
      console.error('Error updating message status:', error);
    }
  };

  const deleteMessage = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
      try {
        await messagesAPI.deleteMessage(id);
        await loadMessages();
        if (selectedMessage && selectedMessage._id === id) {
          setSelectedMessage(null);
        }
      } catch (error) {
        console.error('Error deleting message:', error);
      }
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'new':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'read':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'replied':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      default:
        return <Mail className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return 'bg-red-100 text-red-800';
      case 'read':
        return 'bg-blue-100 text-blue-800';
      case 'replied':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredMessages = messages.filter(message => {
    if (filter === 'all') return true;
    return message.status === filter;
  });

  const statusCounts = {
    all: messages.length,
    new: messages.filter(m => m.status === 'new').length,
    read: messages.filter(m => m.status === 'read').length,
    replied: messages.filter(m => m.status === 'replied').length
  };

  if (loading) {
    return <LoadingSpinner size="lg" className="h-64" />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Messages de Contact</h1>
        <p className="text-gray-600">Gérez les messages de vos visiteurs</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        {[
          { key: 'all', label: 'Tous', count: statusCounts.all },
          { key: 'new', label: 'Nouveaux', count: statusCounts.new },
          { key: 'read', label: 'Lus', count: statusCounts.read },
          { key: 'replied', label: 'Répondus', count: statusCounts.replied }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === tab.key
                ? 'bg-white shadow-sm text-gray-900'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredMessages.length > 0 ? (
            filteredMessages.map((message) => (
              <Card 
                key={message._id}
                className={`cursor-pointer transition-colors ${
                  selectedMessage?._id === message._id ? 'ring-2 ring-blue-500' : ''
                } ${message.status === 'new' ? 'bg-blue-50' : ''}`}
                onClick={() => {
                  setSelectedMessage(message);
                  if (message.status === 'new') {
                    updateMessageStatus(message._id, 'read');
                  }
                }}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {getStatusIcon(message.status)}
                        <h3 className="font-semibold text-gray-900">{message.name}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(message.status)}`}>
                          {message.status}
                        </span>
                      </div>
                      <h4 className="text-sm font-medium text-gray-700 mb-1">
                        {message.subject}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {truncateText(message.message, 100)}
                      </p>
                      <div className="text-xs text-gray-500">
                        {message.email} • {formatDate(message.created_at)}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteMessage(message._id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Aucun message dans cette catégorie</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Message Detail */}
        <div>
          {selectedMessage ? (
            <Card className="sticky top-4">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Détails du Message</CardTitle>
                  <div className="flex space-x-2">
                    {selectedMessage.status !== 'replied' && (
                      <Button
                        size="sm"
                        onClick={() => updateMessageStatus(selectedMessage._id, 'replied')}
                      >
                        Marquer comme répondu
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedMessage.name}</h3>
                  <p className="text-sm text-gray-600">{selectedMessage.email}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Sujet:</h4>
                  <p className="text-sm">{selectedMessage.subject}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Message:</h4>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Reçu le {formatDate(selectedMessage.created_at)}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedMessage.status)}`}>
                      {selectedMessage.status}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}&body=Bonjour ${selectedMessage.name},%0D%0A%0D%0A`}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium inline-block text-center"
                  >
                    Répondre par Email
                  </a>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Sélectionnez un message pour voir les détails</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;