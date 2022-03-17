package mathrone.backend.repository;

import mathrone.backend.domain.RefreshRedis;
import org.springframework.data.repository.CrudRepository;

public interface RefreshTokenRedisRepository extends CrudRepository<RefreshRedis, String> {
}
