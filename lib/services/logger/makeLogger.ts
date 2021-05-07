import { Severity } from "@sentry/react";
import { env } from "../../constants/env";
import { makeSentryService } from "../sentry/SentryService";

const shouldConsole = env.isLocalHost && !env.isTest;

type LoggerContext = {
  tags?: Record<string, any>;
  extra?: Record<string, any>;
  contexts?: Record<string, any>;
  user?: Record<string, any>;
  level?: Record<string, any>;
  fingerprint?: Record<string, any>;
};

export function makeLogger(
  sentryService: ReturnType<typeof makeSentryService>
) {
  return {
    debug(message: string, context?: LoggerContext) {
      sentryService.log(message, Severity.Debug, context);
      console.debug(message, context);
    },
    info(message: string, context?: LoggerContext) {
      sentryService.log(message, Severity.Info, context);
      if (shouldConsole) {
        console.info(message, context);
      }
    },
    warn(message: string, context?: LoggerContext) {
      sentryService.log(message, Severity.Warning, context);
      console.warn(message, context);
    },
    error(message: string, context?: LoggerContext) {
      sentryService.log(message, Severity.Error, context);
      console.error(message, context);
    },
    setTag: sentryService.setTag,
  };
}

export type ILogger = ReturnType<typeof makeLogger>;
