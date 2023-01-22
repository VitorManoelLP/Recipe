import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.platform.commons.util.AnnotationUtils;
import org.junit.platform.suite.api.SelectClasses;
import org.junit.platform.suite.api.Suite;

import java.io.File;
import java.util.*;
import java.util.stream.Collectors;

public class TestSuiteTest {

    @Test
    public void testSuite() {
        Set<Class<?>> suites = new HashSet<>();
        suites.add(TestSuite.class);
        var files = new File("src/test/java/com").listFiles();
        Set<String> testFilesName = new HashSet<>();
        extractTestFiles(files, testFilesName);
        validate(suites, testFilesName);
    }

    private static void validate(Set<Class<?>> suites, Set<String> testFilesName) {

        boolean selectClassesAnnotation = suites.stream().map(s -> Arrays.stream(s.getAnnotations()).toList()).flatMap(List::stream)
                .anyMatch(a -> a.annotationType().equals(SelectClasses.class));

        boolean suiteAnnotation = suites.stream().map(s -> Arrays.stream(s.getAnnotations()).toList()).flatMap(List::stream)
                .anyMatch(a -> a.annotationType().equals(Suite.class));

        Assertions.assertThat(selectClassesAnnotation)
                .withFailMessage("Há suites de testes sem a anotação SelectClasses!")
                .isTrue();

        Assertions.assertThat(suiteAnnotation)
                .withFailMessage("Há suites de testes sem a anotação Suite!")
                .isTrue();

        suites.forEach(suite -> AnnotationUtils.findAnnotation(suite, SelectClasses.class)
                .map(SelectClasses::value)
                .stream().toList().forEach(clazz -> {

                    List<String> classes = Arrays.stream(clazz)
                            .map(Class::getName)
                            .map(clazzName -> {
                                String[] split = clazzName.split("\\.");
                                String name = split[split.length - 1];
                                return name.concat(".java");
                            }).sorted()
                            .toList();

                    String classesWithoutSuite = testFilesName.stream()
                            .filter(name -> !classes.contains(name))
                            .collect(Collectors.joining(","));

                    Assertions.assertThat(classes)
                            .withFailMessage(String.format("Há classes de teste não importadas dentro da suite de testes: %s", classesWithoutSuite))
                            .isEqualTo(testFilesName.stream().sorted().toList());
                }));
    }

    private void extractTestFiles(File[] files, Set<String> testFiles) {
        if (Objects.nonNull(files)) {
            for (File file : files) {
                if (file.isFile() && file.getName().endsWith("java")) {
                    testFiles.add(file.getName());
                }
                if (file.isDirectory()) {
                    extractTestFiles(file.getAbsoluteFile().listFiles(), testFiles);
                }
            }
        }
    }

}
