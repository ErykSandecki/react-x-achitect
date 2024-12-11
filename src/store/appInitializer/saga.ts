import { put, take } from 'redux-saga/effects';

// others
import {
  AVAILABLE_LANGUAGES,
  DEFAULT_LANGUAGE,
  LANGUAGE,
  LOCATION_API,
} from 'translations/constants';
import { INIT_LANGUAGE_SUCCESS } from './actionsType';
import { resources } from 'translations/resources';

// store
import { initI18n } from 'translations/initI18n';
import { initLanguageSuccess, setIsAppLoaded } from './actions';

export function* appInitSaga() {
  yield take(INIT_LANGUAGE_SUCCESS);

  try {
    yield put(setIsAppLoaded(true));
  } catch (error) {
    yield put(setIsAppLoaded(false));
  }
}

export function* initLanguageSaga() {
  let language = localStorage.getItem(LANGUAGE) || '';

  if (!language) {
    language = yield fetch(LOCATION_API)
      .then(async (response) => {
        const data = await response.json();

        const language = (data as { languages: string })?.languages.substring(
          0,
          2,
        );

        return AVAILABLE_LANGUAGES.includes(language)
          ? language
          : DEFAULT_LANGUAGE;
      })

      .catch(() => DEFAULT_LANGUAGE);

    localStorage.setItem(LANGUAGE, language);
  }

  yield Promise.resolve(initI18n(language, resources[language]));
  yield put(initLanguageSuccess(language));
}