# <div align="center"><img src="https://media1.tenor.com/m/VtFUW-durpoAAAAd/kururin-kuru-kuru.gif" width="50"> <h1>Yet Another HoYoLAB Auto Sign-in Script</h1> <img src="https://media1.tenor.com/m/VtFUW-durpoAAAAd/kururin-kuru-kuru.gif" width="50"> </div>

<br>

Tired of manually signing into HoYoLAB every day for Genshin Impact, Honkai: Star Rail, and other Hoyoverse games?  This script automates the process for you\! 🚀  Get your daily rewards effortlessly and never miss out again. ✨

## 🌟 Features

  - **Effortless Auto Sign-in:** Automatically claims daily rewards for multiple Hoyoverse games.
  - **Multi-Game Support:** Currently supports:
      - Genshin Impact
      - Honkai: Star Rail
      - Honkai Impact 3rd
      - Zenless Zone Zero
      - *Easily extendable to support more Hoyoverse games\!*
  - **Discord Notifications (Optional):** Get notified on Discord when your daily sign-in is successful.
  - **Comprehensive Logging:** Detailed logs to track script execution and troubleshoot any issues.
  - **Simple Configuration:** Easy-to-understand configuration section at the top of the script.
  - **Open Source & Free:**  Feel free to use, modify, and contribute\!

## 🚀 Getting Started

This script is designed to run on **Google Apps Script**, a free and easy-to-use platform. No local installation required\!

### 📝 Prerequisites

  - **A Hoyoverse account:**  (duh\! 😉)
  - **A Google Account:** To access Google Apps Script.
  - **(Optional) Discord Account & Server:** If you want to receive Discord notifications.

### ⚙️ Setup

1.  **Create a Google Apps Script Project:**

      - Go to [script.google.com](https://www.google.com/url?sa=E&source=gmail&q=https://script.google.com/) and log in with your Google Account.
      - Click on **"New project"**.
      - You'll be presented with a blank script editor.

2.  **Copy and Paste the Code:**

      - Copy the entire <a href="https://raw.githubusercontent.com/Davifahrez/Yet-another-hoyolab-auto-signin/refs/heads/main/main.gs">code</a> provided in this repository (the `.gs` file).
      - Paste the code into the Google Apps Script editor, replacing the default `function myFunction() { ... }` code.

### 🛠️ Configuration

The configuration is done directly within the script in the `/** ===================== USER CONFIGURATION ===================== **/` section at the top.  Let's break down each part:

#### 🍪 Finding Your Cookies (LTOKEN\_V2 & LTUID\_V2)

To allow the script to automatically sign in for you, you need to provide your Hoyolab account cookies.  Don't worry, it's easier than it sounds\! Here's how to find them using your browser:

##### Method 1: Using Browser Developer Tools (Recommended - Works on Chrome, Firefox, Edge, etc.)

1.  **Open your browser's Developer Tools:**

      - **Chrome/Edge:** Right-click anywhere on the Hoyolab website ([https://hoyolab.com](https://hoyolab.com)) and select "Inspect" or "Inspect Element". Alternatively, press `Ctrl + Shift + I` (or `Cmd + Option + I` on Mac).
      - **Firefox:** Right-click and select "Inspect Element (Q)". Alternatively, press `Ctrl + Shift + C` (or `Cmd + Option + C` on Mac).

2.  **Navigate to the "Application" or "Storage" tab:**

      - **Chrome/Edge:** Click on the "Application" tab. In the sidebar, under "Storage", select "Cookies" and then choose `https://hoyolab.com`.
      - **Firefox:** Click on the "Storage" tab. In the sidebar, under "Cookies", select `https://hoyolab.com`.

3.  **Find `ltoken_v2` and `ltuid_v2` cookies:**

      - Look for cookies named `ltoken_v2` and `ltuid_v2` in the list.
      - **Important:** Make sure you are looking at the cookies for `https://hoyolab.com` and **not** for game-specific subdomains.

4.  **Copy the "Value" of each cookie:**

      - Double-click on the "Value" column for `ltoken_v2` and `ltuid_v2`.
      - Copy the entire value (it will be a long string of characters).
      - **Paste these values** into the script in the `USER CONFIGURATION` section, replacing the placeholders:

    <!-- end list -->

    ```javascript
    const LTOKEN_V2 = "YOUR_LTOKEN_V2_COOKIE_VALUE;"; // Include trailing ;
    const LTUID_V2 = "YOUR_LTUID_V2_COOKIE_VALUE;";  // Include trailing ;
    ```

    **Make sure to keep the trailing semicolon `;`\!**

##### Method 2: Using Cookie Editor Extensions (If you prefer extensions)

You can also use browser extensions like "EditThisCookie" (Chrome) or "Cookie Quick Manager" (Firefox) to easily view and copy cookies. Install the extension, navigate to Hoyolab, and find the `ltoken_v2` and `ltuid_v2` cookies in the extension's interface.

**⚠️ Security Note:** Treat your cookies like passwords\! Do not share them with anyone and be cautious about where you paste them. This script keeps them within your private Google Apps Script project.

#### 📢 Discord Webhook Setup (Optional)

If you want to receive Discord notifications when the script runs, follow these steps:

1.  **Create a Discord Webhook:**

      - Go to your Discord server and navigate to the channel where you want to receive notifications.
      - Click on the channel settings (Edit Channel icon).
      - Go to "Integrations" and click "Create Webhook".
      - Customize the webhook name and avatar if you like, and click "Copy Webhook URL".

2.  **Configure Discord settings in the script:**

      - In the `DISCORD` section of the configuration, update the following:

    <!-- end list -->

    ```javascript
    const DISCORD = {
        enabled: true, // Set to 'true' to enable Discord notifications
        userID: "YOUR_DISCORD_USER_ID", // Your Discord User ID (optional, for mentioning you) - Find this in Discord settings -> Advanced -> Developer Mode (copy ID when right-clicking your name)
        userName: "Your Discord Name", // Your Discord Name (Fallback if userID is not numeric or not provided)
        webhook: "YOUR_DISCORD_WEBHOOK_URL", // Paste the Webhook URL you copied from Discord
        avatar: "[https://media1.tenor.com/m/VtFUW-durpoAAAAd/kururin-kuru-kuru.gif](https://media1.tenor.com/m/VtFUW-durpoAAAAd/kururin-kuru-kuru.gif)" // Optional: Customize the notification avatar
    };
    ```

      - Set `enabled: true` to activate Discord notifications.
      - Paste your copied Webhook URL into `webhook: "YOUR_DISCORD_WEBHOOK_URL"`.
      - Optionally, you can configure `userID`, `userName`, and `avatar`.
      - Set `enabled: false` to disable Discord notifications.

#### 🎮 Game Configuration

In the `GAMES` section, you can enable or disable sign-in for each supported game:

```javascript
const GAMES = {
    genshin: {
        name: "Genshin Impact",
        enabled: true, // Set to 'true' to enable sign-in for Genshin
        url: "[https://sg-hk4e-api.hoyolab.com/event/sol/sign?lang=en-us&act_id=e202102251931481](https://sg-hk4e-api.hoyolab.com/event/sol/sign?lang=en-us&act_id=e202102251931481)" // You usually don't need to change this URL
    },
    honkai_star_rail: {
        name: "Honkai: Star Rail",
        enabled: true, // Set to 'true' to enable sign-in for HSR
        url: "[https://sg-public-api.hoyolab.com/event/luna/os/sign?lang=en-us&act_id=e202303301540311](https://sg-public-api.hoyolab.com/event/luna/os/sign?lang=en-us&act_id=e202303301540311)" // You usually don't need to change this URL
    },
    honkai_3: {
        name: "Honkai Impact 3rd",
        enabled: true, // Set to 'true' to enable sign-in for HI3
        url: "[https://sg-public-api.hoyolab.com/event/mani/sign?lang=en-us&act_id=e202110291205111](https://sg-public-api.hoyolab.com/event/mani/sign?lang=en-us&act_id=e202110291205111)" // You usually don't need to change this URL
    },
    zenless_zone_zero: {
        name: "Zenless Zone Zero",
        enabled: true, // Set to 'true' to enable sign-in for ZZZ
        url: "[https://sg-public-api.hoyolab.com/event/mani/sign?lang=en-us&act_id=e202406031448091](https://sg-public-api.hoyolab.com/event/mani/sign?lang=en-us&act_id=e202406031448091)" // You usually don't need to change this URL
    }
};
```

  - Set `enabled: true` to enable sign-in for a game, or `enabled: false` to disable it.
  - The `url` values are usually correct and you shouldn't need to change them unless Hoyoverse updates their API endpoints.

### ▶️ Running the Script

1.  **Save your script:** Click the "Save" icon (floppy disk) in the Google Apps Script editor. Give your project a name, for example, "HoYoLAB Auto Sign-in".

2.  **Run the `main` function:**

      - In the script editor, select the function `main` from the function dropdown menu (it's usually next to the "Run" button - ▶️).
      - Click the "Run" button ▶️.

3.  **Authorize the script (First time only):**

      - Google Apps Script will ask for authorization to run the script.
      - Click "Authorize" and follow the prompts to grant the necessary permissions. This is required for the script to fetch data from Hoyolab and (optionally) send Discord notifications.

4.  **Check the Execution Log:**

      - After running the script, click on "Executions" in the left sidebar.
      - You should see an execution log for the `main` function. Click on it to view the detailed logs.
      - Check the logs for any errors or messages. Successful sign-in messages should be visible in the logs.

### ⏰ Setting up Time-Based Trigger (Automatic Execution)

To run the script automatically every day:

1.  **Click on "Triggers"** in the left sidebar of the Google Apps Script editor.

2.  **Click on "+ Add Trigger"** in the bottom right corner.

3.  **Configure the trigger:**

      - **Choose which function to run:** `main`
      - **Choose which deployment to run:** `Head`
      - **Choose event source:** `Time-driven`
      - **Choose type of time based trigger:** `Day timer`
      - **Choose time of day:** Select a time that works for you (e.g., "6am to 7am"). It's recommended to choose a time when server load is likely lower.
      - **Error notification frequency:** Choose how often you want to receive error notifications (e.g., "Immediately" or "Daily").

4.  **Click "Save".**

Now the script will run automatically every day at the time you specified\! 🎉

## ⚙️ Configuration Options in Detail

### Cookies Configuration

```javascript
const CONFIG = {
    cookies: {
        ltoken_v2: LTOKEN_V2,
        ltuid_v2: LTUID_V2,
    },
    // ... other configurations
};
```

  - `ltoken_v2`:  Your `ltoken_v2` cookie value. **Required.**
  - `ltuid_v2`: Your `ltuid_v2` cookie value. **Required.**

These cookies are essential for authenticating your requests to Hoyolab.  Make sure you provide the correct values\!

### Discord Configuration

```javascript
const CONFIG = {
    // ... other configurations
    discord: DISCORD,
};

const DISCORD = {
    enabled: false,
    userID: "xxxxxxxx",
    userName: "Traveler",
    webhook: "xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    avatar: "[https://media1.tenor.com/m/VtFUW-durpoAAAAd/kururin-kuru-kuru.gif](https://media1.tenor.com/m/VtFUW-durpoAAAAd/kururin-kuru-kuru.gif)"
};
```

  - `enabled`: Set to `true` to enable Discord notifications, `false` to disable. **Optional, default: `false`.**
  - `userID`: Your Discord User ID (numeric). Used to mention you in the Discord notification (e.g., `<@YOUR_USER_ID>`). **Optional.**
  - `userName`: Your Discord username. Used as a fallback mention if `userID` is not provided or not numeric. **Optional, default: "Traveler".**
  - `webhook`: Your Discord Webhook URL. **Required if `enabled: true`.**
  - `avatar`: URL for the Discord notification avatar. **Optional, default: Kururin GIF.**

### Games Configuration

```javascript
const CONFIG = {
    // ... other configurations
    games: GAMES
};

const GAMES = {
    genshin: {
        name: "Genshin Impact",
        enabled: true,
        url: "..."
    },
    honkai_star_rail: {
        name: "Honkai: Star Rail",
        enabled: true,
        url: "..."
    },
    honkai_3: {
        name: "Honkai Impact 3rd",
        enabled: true,
        url: "..."
    },
    zenless_zone_zero: {
        name: "Zenless Zone Zero",
        enabled: true,
        url: "..."
    }
};
```

  - Each game (e.g., `genshin`, `honkai_star_rail`, etc.) is an object with the following properties:
      - `name`: The name of the game (for logging and display). **Informational.**
      - `enabled`: Set to `true` to enable sign-in for this game, `false` to disable. **Required.**
      - `url`: The API endpoint for the game's daily sign-in. **Usually no need to change.**

## 🐛 Logging and Troubleshooting

  - **Execution Logs:** Check the "Executions" tab in Google Apps Script to view the logs for each script run. Look for error messages or unexpected behavior in the logs.
  - **Logger.log & console.log:** The script uses both `Logger.log` (Google Apps Script logger) and `console.log` (for browser console if you run the script in debug mode) for logging messages.
  - **Common Issues:**
      - **Invalid Cookies:** Double-check your `ltoken_v2` and `ltuid_v2` cookies if the script fails to sign in. Cookies can expire, so you might need to update them periodically.
      - **Discord Webhook Issues:** Verify your Discord Webhook URL if notifications are not being sent. Check your Discord server settings and webhook configuration.
      - **Hoyolab API Changes:** In rare cases, Hoyoverse might update their API endpoints, which could break the script. If this happens, please report it in the issues\!

## 🤝 Contributing

Contributions are welcome\! If you have suggestions, bug reports, or want to add support for more games, feel free to:

  - **Fork this repository.**
  - **Create a new branch** with your changes.
  - **Submit a pull request.**

## 🙏 Credits

  - Original script by [canaria3406](https://github.com/canaria3406/hoyolab-auto-sign) - Thank you for the initial implementation\!
  - Simplified and enhanced by [Davifahrez](https://www.google.com/url?sa=E&source=gmail&q=https://github.com/your-github-username) - This version is my simplification and includes improved logging and easier configuration.

## ⚠️ Disclaimer

This script is provided for educational and personal use only. Use it at your own risk.

  - **Account Security:** While this script is designed to be safe, using automation tools always carries some risk. Ensure you keep your cookies private and understand the potential risks involved.
  - **Terms of Service:**  Be aware of Hoyoverse's terms of service regarding automation. Using this script might technically violate their terms, although the risk is generally considered low for personal use.

**Use this script responsibly and enjoy your automatically claimed daily rewards\!** 😊
