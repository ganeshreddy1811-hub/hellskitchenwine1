import { useEffect, useState } from 'react';
import { Settings as SettingsIcon, Save, AlertCircle, CheckCircle, Store, Clock, MessageSquare } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function Settings() {
  const [accountSid, setAccountSid] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+16802198651");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [appSettings, setAppSettings] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'twilio' | 'store' | 'messaging'>('store');

  useEffect(() => {
    loadSettings();
    loadAppSettings();
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    setWebhookUrl(`${supabaseUrl}/functions/v1/twilio-webhook`);
  }, []);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('key, value')
        .in('key', ['twilio_account_sid', 'twilio_auth_token', 'twilio_phone_number']);

      if (error) throw error;

      if (data) {
        data.forEach((setting) => {
          switch (setting.key) {
            case 'twilio_account_sid':
              setAccountSid(setting.value);
              break;
            case 'twilio_auth_token':
              setAuthToken(setting.value);
              break;
            case 'twilio_phone_number':
              setPhoneNumber(setting.value);
              break;
          }
        });
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const loadAppSettings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('app_settings')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      setAppSettings(data || {});
    } catch (error) {
      console.error('Error loading app settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTwilio = async () => {
    setSaving(true);
    setResult(null);

    try {
      const updates = [
        { key: 'twilio_account_sid', value: accountSid },
        { key: 'twilio_auth_token', value: authToken },
        { key: 'twilio_phone_number', value: phoneNumber },
      ];

      for (const update of updates) {
        const { error } = await supabase
          .from('settings')
          .update({ value: update.value, updated_at: new Date().toISOString() })
          .eq('key', update.key);

        if (error) throw error;
      }

      setResult({ success: true, message: 'Twilio settings saved successfully' });
    } catch (error: any) {
      setResult({ success: false, message: error.message || 'Failed to save settings' });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAppSettings = async () => {
    setSaving(true);
    setResult(null);

    try {
      const { error } = await supabase
        .from('app_settings')
        .update({ ...appSettings, updated_at: new Date().toISOString() })
        .eq('id', appSettings.id);

      if (error) throw error;

      setResult({ success: true, message: 'Settings saved successfully' });
      await loadAppSettings();
    } catch (error: any) {
      setResult({ success: false, message: error.message || 'Failed to save settings' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-500">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <SettingsIcon className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold">Settings</h2>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab('store')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'store'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Store className="w-5 h-5" />
            Store Info
          </button>
          <button
            onClick={() => setActiveTab('messaging')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'messaging'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            Messaging Rules
          </button>
          <button
            onClick={() => setActiveTab('twilio')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'twilio'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Clock className="w-5 h-5" />
            Twilio Config
          </button>
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'store' && appSettings && (
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Store Name
              </label>
              <input
                type="text"
                value={appSettings.store_name || ''}
                onChange={(e) => setAppSettings({ ...appSettings, store_name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Store Website
              </label>
              <input
                type="url"
                value={appSettings.store_website || ''}
                onChange={(e) => setAppSettings({ ...appSettings, store_website: e.target.value })}
                placeholder="https://example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Store Logo URL (optional)
              </label>
              <input
                type="url"
                value={appSettings.store_logo_url || ''}
                onChange={(e) => setAppSettings({ ...appSettings, store_logo_url: e.target.value })}
                placeholder="https://example.com/logo.png"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {activeTab === 'messaging' && appSettings && (
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Hours (Eastern Time)
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Start Hour</label>
                  <select
                    value={appSettings.business_hours_start || 9}
                    onChange={(e) => setAppSettings({ ...appSettings, business_hours_start: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {Array.from({ length: 24 }, (_, i) => (
                      <option key={i} value={i}>
                        {i === 0 ? '12 AM' : i < 12 ? `${i} AM` : i === 12 ? '12 PM' : `${i - 12} PM`}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">End Hour</label>
                  <select
                    value={appSettings.business_hours_end || 18}
                    onChange={(e) => setAppSettings({ ...appSettings, business_hours_end: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {Array.from({ length: 24 }, (_, i) => (
                      <option key={i} value={i}>
                        {i === 0 ? '12 AM' : i < 12 ? `${i} AM` : i === 12 ? '12 PM' : `${i - 12} PM`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                New York state requires messages between 9 AM - 6 PM
              </p>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={appSettings.sunday_sending_enabled || false}
                  onChange={(e) => setAppSettings({ ...appSettings, sunday_sending_enabled: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Allow sending on Sundays</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={appSettings.holiday_sending_enabled || false}
                  onChange={(e) => setAppSettings({ ...appSettings, holiday_sending_enabled: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Allow sending on holidays</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={appSettings.require_opt_in || true}
                  onChange={(e) => setAppSettings({ ...appSettings, require_opt_in: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Require customer opt-in</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                250 Points Message Template
              </label>
              <textarea
                value={appSettings.message_template_250 || ''}
                onChange={(e) => setAppSettings({ ...appSettings, message_template_250: e.target.value })}
                rows={3}
                placeholder="Use {name} for customer name and {points} for points"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                500 Points Message Template
              </label>
              <textarea
                value={appSettings.message_template_500 || ''}
                onChange={(e) => setAppSettings({ ...appSettings, message_template_500: e.target.value })}
                rows={3}
                placeholder="Use {name} for customer name and {points} for points"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          </div>
        )}

        {activeTab === 'twilio' && (
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account SID
              </label>
              <input
                type="text"
                value={accountSid}
                onChange={(e) => setAccountSid(e.target.value)}
                placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Auth Token
              </label>
              <input
                type="password"
                value={authToken}
                onChange={(e) => setAuthToken(e.target.value)}
                placeholder="Your Twilio Auth Token"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Twilio Phone Number
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+1234567890"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Webhook URL for STOP Messages
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={webhookUrl}
                  readOnly
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                />
                <button
                  onClick={() => navigator.clipboard.writeText(webhookUrl)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Copy
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Configure this URL in your Twilio phone number settings as the Messaging Webhook
              </p>
            </div>
          </div>
        )}

        {result && (
          <div
            className={`flex items-start gap-2 p-3 mb-4 rounded-lg border ${
              result.success
                ? 'bg-green-50 border-green-200'
                : 'bg-red-50 border-red-200'
            }`}
          >
            {result.success ? (
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
            )}
            <div className="text-sm">
              <p
                className={`font-medium ${
                  result.success ? 'text-green-900' : 'text-red-900'
                }`}
              >
                {result.success ? 'Success' : 'Error'}
              </p>
              <p className={result.success ? 'text-green-700' : 'text-red-700'}>
                {result.message}
              </p>
            </div>
          </div>
        )}

        <button
          onClick={activeTab === 'twilio' ? handleSaveTwilio : handleSaveAppSettings}
          disabled={saving}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          <Save className="w-5 h-5" />
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
}
