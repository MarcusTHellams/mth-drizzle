import 'dotenv/config';

import { categorySeed } from './category';
import { postSeed } from './post';
import { userAndProfile } from './userAndProfile';

(async () => {
  // await userAndProfile();
  // await categorySeed();
  await postSeed();
})();
