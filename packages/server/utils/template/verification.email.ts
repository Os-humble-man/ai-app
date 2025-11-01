const verificationEmailTemplate = (verificationLink: string) => `<!doctype html>
<html lang="fr">
 <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vérification d'adresse email</title>
  <style>
    body {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 20px;
    }

    html {
      height: 100%;
    }

    .email-container {
      max-width: 600px;
      width: 100%;
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      overflow: hidden;
    }

    .email-header {
      padding: 40px 40px 30px;
      text-align: center;
      border-bottom: 1px solid #e5e7eb;
    }

    .logo {
      width: 60px;
      height: 60px;
      margin: 0 auto 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .logo-text {
      font-size: 28px;
      font-weight: bold;
      color: #ffffff;
    }

    .company-name {
      font-size: 24px;
      font-weight: 700;
      color: #1f2937;
      margin: 0;
    }

    .email-body {
      padding: 40px;
    }

    .welcome-title {
      font-size: 28px;
      font-weight: 700;
      color: #1f2937;
      margin: 0 0 20px 0;
      text-align: center;
    }

    .message {
      font-size: 16px;
      line-height: 1.6;
      color: #4b5563;
      margin: 0 0 30px 0;
      text-align: center;
    }

    .verification-box {
      background: #f9fafb;
      border: 2px dashed #d1d5db;
      border-radius: 12px;
      padding: 30px;
      text-align: center;
      margin: 30px 0;
    }

    .verification-code {
      font-size: 32px;
      font-weight: 700;
      color: #667eea;
      letter-spacing: 8px;
      margin: 10px 0;
      font-family: 'Courier New', monospace;
    }

    .code-label {
      font-size: 14px;
      color: #6b7280;
      margin-bottom: 10px;
    }

    .verify-button {
      display: inline-block;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #ffffff;
      text-decoration: none;
      padding: 16px 48px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      transition: transform 0.2s, box-shadow 0.2s;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
      cursor: pointer;
      border: none;
    }

    .verify-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
    }

    .button-container {
      text-align: center;
      margin: 30px 0;
    }

    .divider {
      text-align: center;
      margin: 30px 0;
      position: relative;
    }

    .divider::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      width: 100%;
      height: 1px;
      background: #e5e7eb;
    }

    .divider-text {
      background: #ffffff;
      padding: 0 20px;
      color: #9ca3af;
      font-size: 14px;
      position: relative;
      display: inline-block;
    }

    .alternative-text {
      font-size: 14px;
      color: #6b7280;
      text-align: center;
      margin: 20px 0;
    }

    .link {
      color: #667eea;
      text-decoration: none;
      word-break: break-all;
    }

    .link:hover {
      text-decoration: underline;
    }

    .email-footer {
      background: #f9fafb;
      padding: 30px 40px;
      border-top: 1px solid #e5e7eb;
    }

    .footer-text {
      font-size: 14px;
      color: #6b7280;
      text-align: center;
      margin: 0 0 20px 0;
      line-height: 1.5;
    }

    .company-info {
      font-size: 12px;
      color: #9ca3af;
      text-align: center;
      margin: 0;
    }

    .icon {
      width: 24px;
      height: 24px;
      display: inline-block;
      vertical-align: middle;
      margin-right: 8px;
    }

    @media (max-width: 640px) {
      .email-body {
        padding: 30px 20px;
      }

      .email-header {
        padding: 30px 20px 20px;
      }

      .welcome-title {
        font-size: 24px;
      }

      .verification-code {
        font-size: 24px;
        letter-spacing: 4px;
      }

      .verify-button {
        padding: 14px 32px;
        font-size: 15px;
      }
    }
  </style>
 </head>
 <body>
  <div class="email-container">
   <div class="email-header">
    <div class="logo"><span class="logo-text">M</span>
    </div>
    <h1 class="company-name">MonApp</h1>
   </div>
   <div class="email-body">
    <h2 class="welcome-title">Bienvenue ! </h2>
    <p class="message">Merci de vous être inscrit sur notre plateforme. Pour finaliser la création de votre compte et commencer à utiliser nos services, veuillez vérifier votre adresse email.</p>
    <div class="button-container">
      <a href="${verificationLink}" class="verify-button">Vérifier mon adresse email</a>
    </div>
    <div class="divider"><span class="divider-text">OU</span>
    </div>
    <p class="alternative-text">Copiez et collez ce lien dans votre navigateur :</p>
    <p class="alternative-text"><a href="${verificationLink}" class="link">${verificationLink}</a></p>
   </div>
   <div class="email-footer">
    <p class="footer-text">Si vous n'avez pas créé de compte sur notre plateforme, vous pouvez ignorer cet email en toute sécurité. Aucune action supplémentaire n'est requise.</p>
    <p class="company-info">© 2024 MonApp. Tous droits réservés.</p>
   </div>
  </div>
 </body>
</html>`;

export { verificationEmailTemplate };
