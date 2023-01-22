package com.recipe.apirecipe;

import com.recipe.apirecipe.util.ProfilesUtil;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class ProfileUtilTest {

    @Test
    public void profilesTestingValues() {
        assertThat(ProfilesUtil.DEV).isEqualTo("dev");
        assertThat(ProfilesUtil.TEST).isEqualTo("test");
    }

}