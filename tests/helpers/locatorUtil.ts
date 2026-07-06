import { Locator } from "@playwright/test";

export type LocatorFromAnother = (anotherLocator: Locator) => Locator;