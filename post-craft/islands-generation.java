import net.minecraft.world.World;
import net.minecraft.world.chunk.IChunkGenerator;
import net.minecraft.world.chunk.IChunkProvider;
import net.minecraftforge.fml.common.IWorldGenerator;

import java.util.Random;

/**
 * Created by Defernus on 07.06.2017.
 */
public class MyGenerator implements IWorldGenerator {

    @Override
    public void generate(Random rnd, int chunkX, int chunkZ, World world, IChunkGenerator iChunkGenerator, IChunkProvider iChunkProvider) {
        if(!canGenerateHere(world, chunkX, chunkZ)) {//прирываем ф-ю, если не можем генерировать в этом чанке
            return;
        }
        
        //ну а тут будет сам генератор
        
    }

    //Проверяем чанк на возможность генерации в нем
    private static boolean canGenerateHere(World world, int chunkX, int chunkZ) {
        Random rnd = world.setRandomSeed(chunkX, chunkZ, 651246235);
        // в нашем случае берется число от 0, до 9 и если оно равно 0,
        // то мы можем генерировать в нем(т.е. на будут подходить примерно
        // 10% всех чанков)
        return rnd.nextInt(10)==0;
    }
}
