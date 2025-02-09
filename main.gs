/**
 * Efficient HoYoLAB Auto Sign-in Script with Comprehensive Logging
 * Handles multiple game sign-ins and Discord notifications
 * 
 * Original by https://github.com/canaria3406/hoyolab-auto-sign
 * Simplified by Davifahrez
 */

/** ===================== USER CONFIGURATION ===================== **/

// Auth tokens: Update these with your values.
const LTOKEN_V2 = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx;"; // Include trailing ;
const LTUID_V2 = "xxxxxxxxxxxxx;";  // Include trailing ;

const DISCORD = {
  enabled: false,
  userID: "xxxxxxxx",
  userName: "Traveler",
  webhook: "xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  avatar: "https://media1.tenor.com/m/VtFUW-durpoAAAAd/kururin-kuru-kuru.gif"
};

// Game configuration: Enable/disable games and update URLs if necessary.
const GAMES = {
  genshin: {
    name: "Genshin Impact",
    enabled: true,
    url: "https://sg-hk4e-api.hoyolab.com/event/sol/sign?lang=en-us&act_id=e202102251931481"
  },
  honkai_star_rail: {
    name: "Honkai: Star Rail",
    enabled: true,
    url: "https://sg-public-api.hoyolab.com/event/luna/os/sign?lang=en-us&act_id=e202303301540311"
  },
  honkai_3: {
    name: "Honkai Impact 3rd",
    enabled: true,
    url: "https://sg-public-api.hoyolab.com/event/mani/sign?lang=en-us&act_id=e202110291205111"
  },
  zenless_zone_zero: {
    name: "Zenless Zone Zero",
    enabled: true,
    url: "https://sg-public-api.hoyolab.com/event/mani/sign?lang=en-us&act_id=e202406031448091"
  }
};

// Combine all settings into a single configuration object.
const CONFIG = {
  cookies: {
    ltoken_v2: LTOKEN_V2,
    ltuid_v2: LTUID_V2,
  },
  discord: DISCORD,
  games: GAMES
};

/** ===================== END USER CONFIGURATION ===================== **/

/**
 * Constructs the cookie string from CONFIG.cookies.
 */
function buildCookieString() {
  const cookies = CONFIG.cookies;
  return Object.entries(cookies)
    .filter(([_, value]) => value && value !== "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" && value !== "xxxxxxxx")
    .map(([key, value]) => `${key}=${value}`)
    .join('; ');
}

/**
 * Base request options used for both game sign-in and Discord webhook requests.
 */
const BASE_OPTIONS = {
  method: 'POST',
  headers: {
    'Cookie': buildCookieString(),
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'en-US,en;q=0.9',
    'x-rpc-language': 'en-us'
  },
  muteHttpExceptions: true
};

/**
 * Logs a message with a timestamp and an optional error.
 */
function logMessage(message, error = null) {
  const timestamp = new Date().toISOString();
  let logMsg = `[${timestamp}] ${message}`;
  if (error) {
    logMsg += `\nError: ${error.message}\nStack: ${error.stack || 'No stack trace'}`;
  }
  Logger.log(logMsg);
  console.log(logMsg);
}

/**
 * Main execution function.
 */
function main() {
  logMessage("🚀 Starting HoYoLAB Auto Sign-in Script");
  logMessage("📊 Configuration Summary:");
  logMessage(`- Games Enabled: ${Object.entries(CONFIG.games)
    .filter(([_, game]) => game.enabled)
    .map(([_, game]) => game.name)
    .join(', ')}`);
  logMessage(`- Discord Notifications: ${CONFIG.discord.enabled ? 'Enabled' : 'Disabled'}`);
  logMessage(`- Cookie String: ${buildCookieString()}`);

  try {
    const responses = autoSignFunction();
    logMessage(`✅ Sign-in completed. Responses received: ${responses.length}`);

    if (responses.length > 0 && CONFIG.discord.enabled && CONFIG.discord.webhook) {
      // Check if userID is numeric; if not, use userName.
      const mention = (CONFIG.discord.userID && /^\d+$/.test(CONFIG.discord.userID))
        ? `<@${CONFIG.discord.userID}>`
        : CONFIG.discord.userName;
        
      logMessage("📨 Sending Discord notification");
      postWebhook(`${mention}, ${responses.join('\n')}`);
    }
  } catch (error) {
    logMessage("❌ Main function execution failed", error);
  }

  logMessage("🏁 Script execution completed");
}

/**
 * Handles game sign-ins for all enabled games.
 * @returns {string[]} Array of response messages from each sign-in.
 */
function autoSignFunction() {
  logMessage("📝 Starting auto sign-in process");
  
  const responses = Object.entries(CONFIG.games)
    .filter(([_, game]) => game.enabled)
    .map(([gameKey, game]) => {
      logMessage(`🎮 Processing ${game.name} (${gameKey})`);
      
      try {
        logMessage(`📡 Sending request to: ${game.url}`);
        const response = UrlFetchApp.fetch(game.url, BASE_OPTIONS);
        const result = JSON.parse(response.getContentText());

        logMessage(`📥 Full response for ${game.name}: ${JSON.stringify(result, null, 2)}`);

        // Return the message or a fallback if it's missing.
        return result.message || `No message returned for ${game.name}`;
        
      } catch (error) {
        logMessage(`❌ Failed to process ${game.name}`, error);
        return `Error with ${game.name}: ${error.message}`;
      }
    })
    .filter(Boolean);

  logMessage(`✅ Auto sign-in completed. Processed ${responses.length} games`);
  return responses;
}

/**
 * Posts a notification to the specified Discord webhook.
 * @param {string} content - The message content to send.
 */
function postWebhook(content) {
  logMessage("🔔 Preparing Discord notification");
  
  try {
    const payload = {
      username: "Auto Check-In Notification",
      avatar_url: CONFIG.discord.avatar,
      content: content
    };

    logMessage("📤 Sending Discord webhook request");
    logMessage(`Payload: ${JSON.stringify(payload, null, 2)}`);

    const options = {
      ...BASE_OPTIONS,
      contentType: 'application/json',
      payload: JSON.stringify(payload)
    };

    UrlFetchApp.fetch(CONFIG.discord.webhook, options);
    logMessage("✅ Discord notification sent successfully");
  } catch (error) {
    logMessage("❌ Failed to send Discord notification", error);
  }
}