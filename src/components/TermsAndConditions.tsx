import { FileText } from 'lucide-react';

export function TermsAndConditions() {
  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <FileText className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-semibold">SMS Marketing Terms and Conditions</h2>
      </div>

      <div className="prose prose-sm max-w-none space-y-6">
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Hell's Kitchen Wine & Spirits (54 Wines)</h3>
          <p className="text-gray-700 mb-4">
            By participating in our SMS loyalty program, you agree to receive text messages from Hell's Kitchen Wine & Spirits (54 Wines)
            regarding your loyalty points, special offers, and store updates.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Age Requirement - IMPORTANT</h3>
          <div className="bg-red-50 border border-red-300 rounded-lg p-4">
            <p className="text-red-900 font-semibold mb-2">
              ⚠️ YOU MUST BE 21 YEARS OF AGE OR OLDER TO PARTICIPATE IN THIS PROGRAM
            </p>
            <ul className="list-disc list-inside space-y-2 text-red-800">
              <li>This program is for alcoholic beverage purchases and promotions</li>
              <li>All customers enrolled in this program have been verified as 21+ years of age by presenting valid government-issued ID in-store</li>
              <li>Enrollment occurred at the time of in-store sign-up with ID verification</li>
              <li><strong>If you are under 21 years of age, you must immediately unsubscribe by replying STOP</strong></li>
              <li>Participation by anyone under 21 is strictly prohibited by law</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Enrollment Process</h3>
          <p className="text-gray-700 mb-2">
            All participants in this loyalty program:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Signed up in-person at Hell's Kitchen Wine & Spirits (54 Wines)</li>
            <li>Provided valid government-issued photo identification proving they are 21 years of age or older</li>
            <li>ID was verified by store staff at the time of enrollment</li>
            <li>Voluntarily consented to receive SMS messages about loyalty rewards and promotions</li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Program Details</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Message frequency varies based on your loyalty point status</li>
            <li>Message and data rates may apply</li>
            <li>No purchase necessary to participate</li>
            <li>Carriers are not liable for delayed or undelivered messages</li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">New York State Compliance</h3>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-gray-700 mb-2">
              <strong>Messaging Hours:</strong> In compliance with New York State regulations, we will only send messages
              between <strong>9:00 AM and 6:00 PM Eastern Time</strong>.
            </p>
            <p className="text-gray-700">
              Messages will not be sent on Sundays or major holidays unless you have explicitly opted in to receive them.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Opt-Out Instructions</h3>
          <p className="text-gray-700 mb-2">
            You can opt out of receiving SMS messages at any time:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Reply <strong>STOP</strong> to any text message to unsubscribe immediately</li>
            <li>Reply <strong>HELP</strong> for assistance</li>
            <li>Contact us in-store to update your preferences</li>
          </ul>
          <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3 mt-3">
            <p className="text-yellow-900 font-semibold text-sm">
              ⚠️ REMINDER: If you are under 21 years of age, reply STOP immediately to unsubscribe. This program is only for customers 21 years and older.
            </p>
          </div>
          <p className="text-gray-700 mt-2">
            Once you opt out, you will receive one final confirmation message and no further messages unless you re-opt in.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Privacy & Data Protection</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>We will never share your phone number with third parties</li>
            <li>Your data is stored securely and encrypted</li>
            <li>We only use your information for loyalty program communications</li>
            <li>You have the right to request deletion of your data at any time</li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Loyalty Points & Rewards</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Points are earned through qualifying purchases at our store</li>
            <li>Points do not expire as long as your account remains active</li>
            <li><strong>250 Points:</strong> Earn $5 OFF your next purchase</li>
            <li><strong>500 Points:</strong> Earn $10 OFF your next purchase</li>
            <li>Rewards must be redeemed in-store and cannot be combined with other offers unless stated</li>
            <li>Points cannot be transferred or exchanged for cash</li>
            <li>Management reserves the right to modify reward values with advance notice</li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-700 mb-2">
              <strong>Hell's Kitchen Wine & Spirits (54 Wines)</strong>
            </p>
            <p className="text-gray-700 mb-2">
              Website: <a href="https://hellskitchenwine.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">hellskitchenwine.com</a>
            </p>
            <p className="text-gray-700">
              For questions about this SMS program or to update your preferences, please visit us in-store or contact us through our website.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Changes to Terms</h3>
          <p className="text-gray-700">
            We reserve the right to modify these terms at any time. Continued participation in the SMS program after changes
            constitutes acceptance of the updated terms. We will notify you of any material changes via SMS.
          </p>
        </section>

        <div className="border-t border-gray-200 pt-6 mt-6">
          <p className="text-sm text-gray-500">
            Last Updated: October 19, 2025
          </p>
        </div>
      </div>
    </div>
  );
}
