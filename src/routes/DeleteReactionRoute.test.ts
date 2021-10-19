import { TEST_AUTH_COOKIE, TEST_USER } from '../../jest.setup';
import Post, { PostDocument } from '../models/Post';
import Reaction, { ReactionDocument, ReactionType } from '../models/Reaction';
import TestUtils from '../utils/TestUtils';

/**
 * TODO: (17.04)
 * - Remove the ".skip" from the following function.
 * - Go to your terminal and run the following command:
 *        npm run test DeleteReaction
 * - Delete this comment.
 */
describe.skip('DELETE /posts/:id/reactions/:reaction', () => {
  let post: PostDocument = null;
  let reaction: ReactionDocument = null;

  beforeAll(async () => {
    post = await Post.create({
      author: TEST_USER._id,
      content: 'Hello World!'
    });

    reaction = await Reaction.create({
      post: post._id,
      type: ReactionType.HEART,
      user: TEST_USER._id
    });
  });

  test('If the user is not authenticated, should return a 401.', async () => {
    await TestUtils.agent
      .delete(`/posts/${post._id}/reactions/${reaction._id}`)
      .expect(401);
  });

  test('If the given post ID is not valid, should return a 400.', async () => {
    await TestUtils.agent
      .delete(`/posts/${TestUtils.INVALID_ID}/reactions/${reaction._id}`)
      .set('Cookie', TEST_AUTH_COOKIE)
      .expect(400);
  });

  test('If the given reaction ID is not valid, should return a 400.', async () => {
    await TestUtils.agent
      .delete(`/posts/${post._id}/reactions/${TestUtils.INVALID_ID}`)
      .set('Cookie', TEST_AUTH_COOKIE)
      .expect(400);
  });

  test('If there is no reaction found with the given ID, should return a 404.', async () => {
    await TestUtils.agent
      .delete(`/posts/${post._id}/reactions/${TestUtils.NOT_FOUND_ID}`)
      .set('Cookie', TEST_AUTH_COOKIE)
      .expect(404);
  });

  test('Should delete the reaction on the given post and return a 204.', async () => {
    await TestUtils.agent
      .delete(`/posts/${post._id}/reactions/${reaction._id}`)
      .set('Cookie', TEST_AUTH_COOKIE)
      .expect(204)
      .then(async () => {
        const deletedReaction: ReactionDocument = await Reaction.findById(
          reaction._id
        );

        expect(deletedReaction).toBe(null);
      });
  });
});
