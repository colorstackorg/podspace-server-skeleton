import { TEST_AUTH_COOKIE, TEST_USER } from '../../jest.setup';
import Post from '../models/Post';
import TestUtils from '../utils/TestUtils';

/**
 * TODO: (15.06)
 * - Remove the ".skip" from the following function.
 * - Go to your terminal and run the following command:
 *        npm run test ListPosts
 * - Delete this comment.
 */
describe.skip('GET /posts', () => {
  beforeAll(async () => {
    await Promise.all([
      Post.create({ author: TEST_USER._id, content: 'Hello!' }),
      Post.create({ author: TEST_USER._id, content: 'Hello!' })
    ]);

    await Promise.all([
      Post.create({ author: TEST_USER._id, content: 'Hello!' }),
      Post.create({ author: TEST_USER._id, content: 'Hello!' })
    ]);
  });

  test('If the user is not authenticated, should return a 401.', async () => {
    await TestUtils.agent.get('/posts').expect(401);
  });

  test('Should return a 200 and array sorted in DESC by createdAt.', async () => {
    await TestUtils.agent
      .get('/posts')
      .set('Cookie', TEST_AUTH_COOKIE)
      .expect(200)
      .then(({ body }) => {
        const sortedPosts = [...body].sort((a, b) => {
          if (a.createdAt < b.createdAt) return 1;
          if (a.createdAt > b.createdAt) return -1;
          return 0;
        });

        expect(body).toHaveLength(4);
        expect(body).toEqual(sortedPosts);

        body.forEach((post) => {
          expect(post.comments).toBeInstanceOf(Array);
        });
      });
  });
});
