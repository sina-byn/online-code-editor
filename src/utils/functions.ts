// * interfaces
import { Code } from "../context/AppContextProvider";

const srcDocTemplate = (code: Code): string => {
    const { html, css, js } = code;

    return `
      <html>
        ${html}
        <style>${css}</style>
        <script>
         const logMessages = [];
         const console = (oldConsole => {
          return {
            log: function(text) {
              oldConsole.log(text);
              const args = Array.from(arguments)
              logMessages.push({
                message: args.length === 1 ? args[0] : args,
                type: "log"
              });
            },
            info: function(text) {
              oldConsole.info(text);
              const args = Array.from(arguments)
              logMessages.push({ 
                message: args.length === 1 ? args[0] : args,
                type: "info"
              });
            },
            warn: function(text) {
              oldConsole.warn(text);
              const args = Array.from(arguments)
              logMessages.push({ 
                message: args.length === 1 ? args[0] : args,
                type: "warn"
              });
            },
            error: function(err) {
              oldConsole.error(err);
              let message;
              if (
                typeof err !== 'object' ||
                Array.isArray(err)) {
                  message = err;
              } else {
                  message = err.name + ': ' + err.message;
              }
              logMessages.push({
                message: message,
                type: "error"
              });
            }
          };
         })(window.console);
         ${js}
         logMessages.push('log-messages');
         window.parent.postMessage(JSON.stringify(logMessages));
        </script>
      </html>
    `;
};

export { srcDocTemplate };