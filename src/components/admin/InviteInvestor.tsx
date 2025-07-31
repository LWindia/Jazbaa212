import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building, Mail, Copy, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';
import { sendRealInviteEmail } from '../../services/realEmailService';

interface Message {
  type: 'success' | 'error';
  text: string;
}

const InviteInvestor: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);
  const [invites, setInvites] = useState<Array<{ email: string; token: string; timestamp: Date }>>([]);

  const generateToken = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const handleSendInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setMessage({ type: 'error', text: 'Please enter an email address' });
      return;
    }

    if (!email.includes('@')) {
      setMessage({ type: 'error', text: 'Please enter a valid email address' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const token = generateToken();
      
      // Send real email using Nodemailer server
      const emailResult = await sendRealInviteEmail(email.trim(), token);
      
      if (emailResult.success) {
        const inviteLink = `https://www.lwjazbaa.com/investor-register/${token}`;
        setMessage({ 
          type: 'success', 
          text: `✅ Investor invite sent successfully to ${email.trim()}! 
          
📧 Email sent automatically via Nodemailer server.
📧 Invite link: ${inviteLink}

🎉 The recipient should receive the email shortly!`
        });
        
        // Add to invites list
        setInvites(prev => [...prev, { email: email.trim(), token, timestamp: new Date() }]);
        setEmail('');
      } else {
        const inviteLink = `https://www.lwjazbaa.com/investor-register/${token}`;
        setMessage({ 
          type: 'success', 
          text: `✅ Investor invite created successfully! 
          
📧 Email sending failed, but invite was saved.
📧 Invite link: ${inviteLink}
📋 Please send this link manually to: ${email.trim()}

⚠️ Error: ${emailResult.error || 'Unknown error'}
🔧 Check Vercel function logs for details.`
        });
        
        // Add to invites list even if email failed
        setInvites(prev => [...prev, { email: email.trim(), token, timestamp: new Date() }]);
        setEmail('');
      }
    } catch (error) {
      console.error('Error sending investor invite:', error);
      setMessage({ 
        type: 'error', 
        text: 'Failed to send investor invite. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const copyInviteLink = (token: string) => {
    const inviteLink = `https://www.lwjazbaa.com/investor-register/${token}`;
    navigator.clipboard.writeText(inviteLink);
    setMessage({ type: 'success', text: 'Investor invite link copied to clipboard!' });
  };

  const openInviteLink = (token: string) => {
    const inviteLink = `https://www.lwjazbaa.com/investor-register/${token}`;
    window.open(inviteLink, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Building className="w-12 h-12 text-purple-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Invite Investors</h1>
            <p className="text-gray-600">Send invitations to investors to join JAZBAA 4.0</p>
          </div>

          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg mb-6 ${
                message.type === 'success' 
                  ? 'bg-green-100 border border-green-400 text-green-700' 
                  : 'bg-red-100 border border-red-400 text-red-700'
              }`}
            >
              <div className="flex items-start">
                {message.type === 'success' ? (
                  <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                )}
                <div className="whitespace-pre-line">{message.text}</div>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSendInvite} className="mb-8">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl border border-purple-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                Send Invitation
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Investor Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="investor@company.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending Invitation...' : '🚀 Send Investor Invitation'}
                </motion.button>
              </div>
            </div>
          </form>

          {invites.length > 0 && (
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Invites</h3>
              <div className="space-y-4">
                {invites.map((invite, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{invite.email}</p>
                        <p className="text-sm text-gray-500">
                          {invite.timestamp.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Token: {invite.token}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => copyInviteLink(invite.token)}
                          className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                          title="Copy invite link"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openInviteLink(invite.token)}
                          className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                          title="Open invite link"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default InviteInvestor; 