package src.com.example.blockchain.config;

import java.io.File;
import java.io.IOException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Iterator;
import java.util.stream.Stream;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.Assert;
import org.zeroturnaround.exec.ProcessExecutor;
import org.zeroturnaround.exec.stream.slf4j.Slf4jStream;

@Configuration
public class SinglePageApplicationConfig {

  private static final DirectoryStream.Filter<Path> FILTER_ASSET =
      file -> Files.isDirectory(file) && file.toString().contains("react-client");

  private static final String NODE_PATH = "/node/node";

  //todo: sadece npm ile yapmanın yolunu araştır
  private static final String YARN_PATH = "/node/yarn/dist/bin/yarn.js";

  private static final String START_COMMAND = "start";

  private static final String INSTALL_COMMAND = "install";

  @Autowired
  public void configure() {
    try {
      final File reactProjectFile = resolveStaticPath();
      final Path nodePath = Paths.get(reactProjectFile.getPath(), NODE_PATH);
      final Path yarnPath = Paths.get(reactProjectFile.getPath(), YARN_PATH);
      checkNodeAndYarnInstalled(nodePath, yarnPath);
      executeCommand(reactProjectFile, nodePath.toString(), yarnPath.toString(), START_COMMAND);
      executeCommand(reactProjectFile, nodePath.toString(), yarnPath.toString(), INSTALL_COMMAND);
    } catch (IOException e) {
      throw new IllegalArgumentException(e);
    }
  }
  private void checkNodeAndYarnInstalled(Path nodePath, Path yarnPath) {
    if (!nodePath.toFile().exists() || !yarnPath.toFile().exists()) {
      throw new IllegalArgumentException("Couldn't find yarn or node");
    }
  }
  private void executeCommand(File file, String... command) throws IOException {
    ProcessExecutor process = new ProcessExecutor()
        .directory(file)
        .command(command)
        .redirectOutput(Slf4jStream.of(LoggerFactory.getLogger("react")).asInfo())
        .redirectError(Slf4jStream.of(LoggerFactory.getLogger("react")).asError());

    if (isWindows()) {
      command = Stream.concat(Stream.of("cmd", "/c"), Stream.of(command)).toArray(String[]::new);
      process = process.command(command);
    }
    process.start();
  }

  private boolean isWindows() {
    return System.getProperty("os.name").toLowerCase().contains("win");
  }

  private File resolveStaticPath() throws IOException {
    Class<?> aClass = deduceMainApplicationClass();
    String currentFileDirectory = aClass.getProtectionDomain().getCodeSource().getLocation().getFile();
    Path path = new File(currentFileDirectory).toPath();
    File file = null;
    while (path != null) {
      Iterator<Path> iterator = Files.newDirectoryStream(path, FILTER_ASSET).iterator();
      if (iterator.hasNext()) {
        Path next = iterator.next();
        file = next.toFile();
        break;
      }
      path = path.getParent();
    }

    Assert.isTrue(file != null && file.exists(), "React project could not be found.");

    return file;
  }

  private Class<?> deduceMainApplicationClass() {
    try {
      StackTraceElement[] stackTrace = new RuntimeException().getStackTrace();
      for (StackTraceElement stackTraceElement : stackTrace) {
        if ("main".equals(stackTraceElement.getMethodName())) {
          return Class.forName(stackTraceElement.getClassName());
        }
      }
    } catch (ClassNotFoundException ignored) {
    }
    throw new IllegalStateException("Class of 'public static void main' could not be found.");
  }
}

